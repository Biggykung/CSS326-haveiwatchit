import pool from "../db/db.js"

const SHOW_TYPES = ["movies", "series", "tv_shows", "anime"];
const SEARCH_FIELDS = ["all", "title", "actor", "director", "creator", "character", "person"];
const FETCH_LIMIT = 50;
// Weight more reviews rather than low review count with high score
const REVIEW_WEIGHT = 3;

// Use to fetch shows information!
const show_query = `
SELECT  s.id, s.name AS title, s.synopsis, s.status,
        DATE_FORMAT(s.release_date, '%d-%m-%Y') AS release_date,
        YEAR(s.release_date) AS release_year,
        s.episode_count, s.duration, s.content_rating, s.photo_url, s.cover_url,
        ROUND(r.avg_score, 1) AS avg_score,
        COALESCE(r.review_count, 0) as review_count
FROM    shows s
        LEFT JOIN (
            SELECT show_id, AVG(review_score) AS avg_score, COUNT(*) AS review_count
            FROM reviews
            GROUP BY show_id
        )   r ON r.show_id = s.id
           `

// Map database into json
const showToJson = (row) => ({
    id: Number(row.id),
    title: row.title,
    type: row.type,
    sypnosis: row.sypnosis,
    status: row.status,
    release_date: row.release_date,
    release_year: row.release_year,
    episode_count: row.episode_count,
    duration: row.duration,
    content_rating: row.content_rating,
    poster_url: row.photo_url || row.cover_url || null,
    backdrop_url: row.cover_url || row.photo_url || null,
    avg_score: row.avg_score === null ? null : Number(row.avg_score),
    review_count: Number(row.review_count)
});

// Wrapper used to handle error for all api calls
const wrapper = (errMsg, controller) => async (req, res) =>
    {try {
        await controller(req, res);
    } catch (error) {
        console.error(`${errMsg}`, error);
        res.status(500).json({message: errMsg});
    }};

// GET /api/shows/:id
export const getShowById = wrapper("Unable to fetch shows/.", async (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    if (Number.isNaN(id) || id < 0) return res.status(400).json({message: "Invalid id!"});
    

    const [rows] = await pool.execute(`${show_query} WHERE s.id = ?`, [id]);
    if (rows.length === 0) return res.status(404).json({message: "Show not found!"});

    const [platforms] = await pool.execute(`
        SELECT p.id, p.name, p.logo_url, p.url 
        FROM show_sources ss
        JOIN show_platform p ON p.id = ss.platform_id
        WHERE ss.show_id = ?
        ORDER by p.name
        `, [id]
    );

    const [credits] = await pool.execute(
        `
        SELECT sr.role, sr.character_name, sr.character_photo, pe.id AS person_id, pe.name AS persona_name, pe.photo_url AS person_photo
        FROM show_roles sr
        JOIN people pe ON pe.id = sr.people_id
        WHERE sr.show_id = ?
        ORDER BY sr.id
        `, [id]
    );

    const creditMapper = (credit) => ({
        person_id: Number(credit.person_id),
        name: credit.person_name,
        photo_url: credit.person_photo || credit.character_photo || null,
        role: credit.role,
        character_name: credit.character_name,
        character_photo: credit.character_photo || credit.person_photo || null
    });

    return res.json({
        ...showToJson(rows[0]),
        platforms,
        cast: credits.filter((c) => ['Actor', 'Voice Actor'].includes(c.role)).map(creditMapper),
        crew: credits.filter((c) => !['Actor', 'Voice Actor'].includes(c.role)).map(creditMapper) 
    });
})