import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"
import path from "path";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5000",
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use("/images", express.static(path.join(path.resolve(), "images")));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// app.get("/", (req, res) => {
//     res.send("This is home page!")
// })

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Have I Watched It?</title>

            <style>
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            
                :root{
                    --background: #ffffff;
                    --planel: #373737;
                    --muted: #999999;
                    --text: #000000;
                    --accent: #ff6b6b;
                    --star: #f1c40f;
                }

                * { box-sizing: border-box; margin: 0; padding: 0;}
                body {
                    font-family: 'Bebas Neue', sans-serif;
                    background-color: var(--background);
                    color: var(--text);
                }
                
                /* Menu */
                nav {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 0.9rem 2rem;
                    background-color: var(--planel);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .logo {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 1.5rem;
                    color: var(--accent);
                    white-space: nowrap;
                }

                nav input[type="text"] {
                    flex: 1;
                    max-width: 420px;
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 6px;
                    background-color: var(--background);
                    color: var(--text);
                    font-size: 1rem;
                    outline: none;
                }
                nav a {
                    color: var(--muted);
                    text-decoration: none;
                    font-size: 1rem;
                    transition: color 0.3s ease;
                }

                nav a:hover { color: var(--accent);}
                .spacer { flex: 1; }

                /* Movie Banner */
                .MovieBanner { position: relative; overflow: hidden; }

                .slides {
                    display: flex;
                    transition: transform 0.6s ease;
                }

                .slide {
                    min-width: 100%;
                    min-height: 440px;
                    display: flex;
                    align-items: flex-end;
                    gap: 2rem;
                    padding: 2.5rem 4rem;
                    color: #ffffff;
                    background:
                        linear-gradient(to top, var(--background), transparent 35%),
                        linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
                        var(--bg) center / cover no-repeat;
                }

                .slide-poster {
                    width: 190px;
                    aspect-ratio: 2 / 3;
                    object-fit: cover;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
                    flex-shrink: 0;
                }

                .slide-info { 
                    max-width: 560px; 
                    padding-bottom: 1rem; 
                }
                .slide-info h1 { 
                    font-size: clamp(2rem, 5vw, 3.5rem); 
                    margin-bottom: 0.4rem; 
                }
                .slide-stars { 
                    color: var(--star); 
                    font-size: 1.4rem; 
                    letter-spacing: 2px; 
                }
                .slide-stars span { 
                    color: #ffffff; 
                    margin-left: 0.4rem; 
                    font-size: 1rem; 
                }
                .slide-info p {
                    font-size: 1.1rem;
                    margin-bottom: 1rem;
                }
                .quote { 
                    font-size: 1.2rem; 
                    margin: 0.8rem 0 0.3rem; 
                    line-height: 1.4; 
                }
                .by { color: #cccccc; margin-bottom: 1rem; }

                .btn {
                    display: inline-block;
                    background-color: var(--accent);
                    color: #ffffff;
                    padding: 0.5rem 1.2rem;
                    border-radius: 6px;
                    text-decoration: none;
                }
                .btn:hover { filter: brightness(1.2); }

                /* Arrow buttons */
                .arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 44px;
                    height: 44px;
                    border: none;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.5);
                    color: #ffffff;
                    font-size: 1.8rem;
                    line-height: 1;
                    cursor: pointer;
                    z-index: 5;
                }
                .arrow:hover { background: var(--accent); }
                .prev { left: 1rem; }
                .next { right: 1rem; }

                /* Position marker */
                .dots {
                    position: absolute;
                    bottom: 1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 0.5rem;
                    z-index: 5;
                }
                .dot {
                    width: 10px;
                    height: 10px;
                    border: none;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    cursor: pointer;
                }
                .dot.active { background: var(--accent); width: 26px; border-radius: 999px; }

                @media (max-width: 640px) {
                    .slide { padding: 2rem 1.2rem 3rem; flex-direction: column; align-items: flex-start; }
                    .slide-poster { width: 120px; }
                    .arrow { display: none; }
                }

                /* Main Content */
                main {max-width: 1200px; margin: 0 auto; padding: 1rem 1.5rem 3rem;}
                h2{
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(1.5rem, 4vw, 2.5rem);
                    text-transform: uppercase;
                    color: var(--accent);
                    border-bottom: 2px solid var(--accent);
                    padding-bottom: 0.5rem;
                    margin-bottom: 1rem;
                }

                /* Poster Grid */
                .posters {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 1rem;
                }

                .poster { cursor: pointer; transition: transform 0.3s ease; }
                
                .poster .img { 
                    aspect-ratio: 2/3;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    position: relative;
                    transition: transform 0.3s, box-shadow 0.3s;
                    overflow: hidden;
                }

                .poster .img img { 
                    width: 100%; 
                    height: 100%; 
                    object-fit: cover; 
                    border-radius: 6px;
                    display: block; 
                }
                    
                .poster:hover .img { 
                    transform: translateY(-5px); 
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                }
                .poster .score {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: rgba(0, 0, 0, 0.7);
                    color: var(--star);
                    font-size: 0.9rem;
                    font-weight: 600;
                    padding: 2px 6px;
                    border-radius: 999px;
                }

                .poster .img .stars {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    padding: 1.5rem 0.5rem 0.4rem;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
                    text-align: center;
                }
                    
                .poster .img .rating { font-size: 1.1rem; }

                .poster .title {
                    margin-top: 0.5rem; 
                    font-size: 0.9rem; 
                    text-align: center; 
                    color: var(--text);
                }

                .poster .year { 
                    color: var(--muted);
                    font-size: 0.8rem;
                }
                
                /* latest Reviews */
                .review{
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    background-color: var(--planel);
                    padding: 1rem;
                    border-radius: 6px;
                    margin-bottom: 1rem;
                }

                .avatar {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: var(--accent);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    flex-shrink: 0;
                }

                .review .stars { color: var(--star); letter-spacing: 1px; font-size: 1.2rem; }
                .review .meta { color: var(--muted); font-size: 0.9rem; }
                .review p { color: #ffffff; font-size: 1rem; line-height: 1.4; }

                .rating {
                    position: relative;
                    display: inline-block;
                    font-size: 1.4rem;
                    line-height: 1;
                    color: #555;    /* Color of unfilled stars */
                }
                .rating::before {
                    content: "★★★★★";
                }
                .rating .fill {
                    position: absolute;
                    top: 0;
                    left: 0;
                    overflow: hidden;
                    white-space: nowrap;
                    color: var(--star); /* Filled star color */
                    width: calc(var(--score) / 10 * 100%);
                }

                footer {
                    text-align: center;
                    padding: 1rem;
                    color: var(--muted);
                    font-size: 0.9rem;
                }
            </style>
        </head>
        <body>
            <nav>
                <span class="logo">Have I Watched It?</span>
                <input type="text" placeholder="Search movies...">
                <div class="spacer"></div>
                <a href="#">Login</a>
                <a href="#">Register</a>
            </nav>

            <header class="MovieBanner">
                <div class="slides" id="slides">

                    <div class="slide" style="--bg: url('/images/avengers-doomsday-bg.jpeg');">
                        <img class="slide-poster" src="/images/avengers-doomsday.jpeg" alt="Avengers: Doomsday">
                        <div class="info">
                            <h1>Avengers: Doomsday</h1>
                            <p>Heroes from three different worlds must unite when they're thrust together to confront a catastrophic danger that could destroy everything they know. <span>Coming soon!</span></p>
                            <div class="slider-stars">
                                <div class="rating" style="--score: 10;">
                                    <span class="fill">★★★★★</span>
                                </div>
                            </div>
                            <a class="btn" href="#">Read reviews</a>
                        </div>
                    </div>
                    <div class="slide" style="--bg: url('/images/avengers-endgame-encore-bg.jpeg');">
                        <img class="slide-poster" src="/images/avengers-endgame-encore.jpeg" alt="Avengers: Endgame Encore">
                        <div class="info">
                            <h1>Avengers: Endgame Encore</h1>
                            <p>After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.</p>
                            <div class="slider-stars">
                                <div class="rating" style="--score: 8.4;">
                                    <span class="fill">★★★★★</span>
                                </div>
                            </div>
                            <a class="btn" href="#">Read reviews</a>
                        </div>
                    </div>
                    <div class="slide" style="--bg: url('/images/avatar-fire-and-ash-bg.jpeg');">
                        <img class="slide-poster" src="/images/avatar-fire-and-ash.jpeg" alt="Avatar: Fire and Ash">
                        <div class="info">
                            <h1>Avatar: Fire and Ash</h1>
                            <p>In the aftermath of the destruction of Pandora, Jake Sully and his family must fight to protect their new home from those who would exploit it.</p>
                            <div class="slider-stars">
                                <div class="rating" style="--score: 7.4;">
                                    <span class="fill">★★★★★</span>
                                </div>
                            </div>
                            <p class="quote">"A visually stunning and emotionally resonant sequel that expands the Avatar universe in exciting ways."</p>
                            <p class="by">- aVatarfAn</p>
                            <a class="btn" href="#">Read reviews</a>
                        </div>
                    </div>
                    <div class="slide" style="--bg: url('/images/avatar-the-way-of-water-bg.jpeg');">
                        <img class="slide-poster" src="/images/avatar-the-way-of-water.jpeg" alt="Avatar: The Way of Water">
                        <div class="info">
                            <h1>Avatar: The Way of Water</h1>
                            <p>Set more than a decade after the events of the first film, the story follows Jake Sully, who must work with his family and the Na'vi people to protect their home from those who would exploit it.</p>
                            <div class="slider-stars">
                                <div class="rating" style="--score: 7.5;">
                                    <span class="fill">★★★★★</span>
                                </div>
                            </div>
                            <p class="quote">"It so good to see the Avatar universe expanded in such a meaningful way!"</p>
                            <p class="by">- aVatarfAn</p>
                            <a class="btn" href="#">Read reviews</a>
                        </div>
                    </div>
                </div>

                <button class="arrow prev" id="prev">&#10094;</button>
                <button class="arrow next" id="next">&#10095;</button>
                <div class="dots" id="dots"></div>

            </header>

            <main>
                <h2>Trending This Week</h2>
                <section class="posters">
                    <div class="poster">
                        <div class="img">
                            <img src="/images/avengers-endgame-encore.jpeg" alt="Avengers: Endgame Encore">
                            <div class="stars">
                                <div class="rating" style="--score: 8.4;">
                                    <span class="fill">★★★★★</span>
                                </div>
                            </div>
                        </div>
                        <div class="title">Avengers: Endgame Encore</div>
                        <div class="year">2026</div>
                    </div>                    
                    <div class="poster">
                        <div class="img">
                            <img src="/images/avatar-fire-and-ash.jpeg" alt="Avatar: Fire and Ash">
                            <div class="stars">
                                <div class="rating" style="--score: 7.4;">
                                    <span class="fill">★★★★★</span>
                                </div>
                            </div>
                        </div>
                        <div class="title">Avatar: Fire and Ash</div>
                        <div class="year">2025</div>
                    </div>
                    <div class="poster">
                        <div class="img">
                            <img src="/images/avatar-the-way-of-water.jpeg" alt="Avatar: The Way of Water">
                            <div class="stars">
                                <div class="rating" style="--score: 7.5;">
                                    <span class="fill">★★★★★</span>
                                </div>
                            </div>
                        </div>
                        <div class="title">Avatar: The Way of Water</div>
                        <div class="year">2022</div>
                    </div>
                </section>

                <h2>Latest Reviews</h2>
                <section class="reviews">
                    <div class="review">
                        <div class="avatar">L</div>
                        <div class="stars">
                            <div class="rating" style="--score: 8.0;">
                                <span class="fill">★★★★★</span>
                            </div>
                        </div>
                        <div class="meta">LowKKKey rewiewed on 2023-08-15 <b>Avatar: The Way of Water</b></div>
                        <div class="content">
                            <h3>Amazing Movie!</h3>
                            <p>The water effects were incredible!. The creatures were well-designed and the world-building was immersive.</p>
                        </div>
                    </div>
                    <div class="review">
                        <div class="avatar">J</div>
                        <div class="stars">
                            <div class="rating" style="--score: 6.0;">
                                <span class="fill">★★★★★</span>
                            </div>
                        </div>
                        <div class="meta">JazzyJ rewiewed on 2023-08-10 <b>Avatar: Fire and Ash</b></div>
                        <div class="content">
                            <h3>Great Follow-up!</h3>
                            <p>This movie builds on the success of the second film and delivers an even more immersive experience.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <p>HaveIWatchedIt? · Coming Soon</p>
            </footer>

            <script>
                var slides = document.getElementById("slides");
                var dotsBox = document.getElementById("dots");
                var total = slides.children.length;
                var index = 0;
                var timer;

                for (var i = 0; i < total; i++) {
                    var dot = document.createElement("button");
                    dot.className = "dot";
                    dot.setAttribute("data-i", i);
                    dot.onclick = function () { go(Number(this.getAttribute("data-i"))); };
                    dotsBox.appendChild(dot);
                }

                function go(n) {
                    index = (n + total) % total;
                    slides.style.transform = "translateX(-" + (index * 100) + "%)";
                    for (var j = 0; j < total; j++) {
                        dotsBox.children[j].className = j === index ? "dot active" : "dot";
                    }
                    restart();
                }

                function restart() {
                    clearInterval(timer);
                    timer = setInterval(function () { go(index + 1); }, 5000);
                }

                document.getElementById("prev").onclick = function () { go(index - 1); };
                document.getElementById("next").onclick = function () { go(index + 1); };

                // Swipe on mobile
                var startX = 0;
                slides.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; });
                slides.addEventListener("touchend", function (e) {
                    var diff = e.changedTouches[0].clientX - startX;
                    if (diff > 50) go(index - 1);
                    if (diff < -50) go(index + 1);
                });

                go(0);
            </script>
        </body>
        </html>`)
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`)
});