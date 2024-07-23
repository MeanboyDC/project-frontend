import React, { useRef } from 'react';
import '../Books/books.css';
import next_icon from '../../assets/next-icon.png';
import back_icon from '../../assets/back-icon.png';
import Cover_1 from '../../assets/cover1.jpeg';
import Cover_2 from '../../assets/cover2.jpeg';
import Cover_3 from '../../assets/cover3.jpeg';
import Cover_4 from '../../assets/cover4.jpeg';

const Books = () => {
    const slider = useRef(null); // Initialize useRef with null

    let tx = 0;

    const slideForward = () => {
        if (tx > -50) {
            tx -= 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    };

    const slideBackward = () => {
        if (tx < 0) {
            tx += 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`;
    };

    return (
        <div className='Testimonials'>
            <img src={next_icon} alt="" className='next-btn' onClick={slideForward} />
            <img src={back_icon} alt="" className='back-btn' onClick={slideBackward} />
            <div className="slider">
                <ul ref={slider} className="slides">
                    <li>
                        <div className="slide">
                            <div className="book-info">
                                <img src={Cover_1} alt='' />
                                <div>
                                    <h3>To Kill a Mockingbird</h3>
                                    <span>Harper Lee</span>
                                </div>
                            </div>
                            <p>"To Kill a Mockingbird" by Harper Lee is a novel set in the fictional town of Maycomb, Alabama, during the 1930s. The story revolves around the trial of Tom Robinson, a Black man falsely accused of raping Mayella Ewell, a white woman. Despite a strong defense by Atticus Finch, Tom is convicted and later killed while trying to escape custody. The novel also explores themes of racial injustice and moral growth</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="book-info">
                                <img src={Cover_2} alt='' />
                                <div>
                                    <h3>Clap When You Land</h3>
                                    <span>Elizabeth Acevedo</span>
                                </div>
                            </div>
                            <p>Separated by distance—and Papi’s secrets—the two girls are forced to face a new reality in which their father is dead and their lives are forever altered. And then, when it seems like they’ve lost everything of their father, they learn of each other.</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="book-info">
                                <img src={Cover_3} alt='' />
                                <div>
                                    <h3>The Past Is Rising</h3>
                                    <span>Kathryn Bywaters</span>
                                </div>
                            </div>
                            <p>The Past Is Rising is a compelling fantasy epic that revolves around the uprising of dark forces bent on wresting a kingdom from its rightful rulers. Several warriors will discover that their true des…</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="book-info">
                                <img src={Cover_4} alt='' />
                                <div>
                                    <h3>Harry Potter and the Deathly Hallows</h3>
                                    <span>J.K. Rowling</span>
                                </div>
                            </div>
                            <p>Harry Potter and the Deathly Hallows is a book published in 2007 that follows Harry, Ron, and Hermione as they embark on a perilous quest to destroy the remaining Horcruxes and defeat the dark wizard Voldemort1234. The trio faces challenges, loss, and revelations about Dumbledore’s past1. Harry has been burdened with the task of locating and destroying Voldemort's remaining Horcruxes3. The remnants of Dumbledore’s Army and the Order of the Phoenix mount a heroic defense of Hogwarts in the attempt to win Harry enough time to finish his quest.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Books;
