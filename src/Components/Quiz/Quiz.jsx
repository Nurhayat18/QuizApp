import React, { useState, useEffect, useRef } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'

const Quiz = () => {
    // Login
    const [name, setName] = useState('');          
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [isStarting, setIsStarting] = useState(false);

    // Quiz 
    const [shuffledData, setShuffledData] = useState([]); 
    const [index, setIndex] = useState(0);                            
    const [questions, setQuestion] = useState(null);          
    const [lock, setLock] = useState(false);              
    const [score, setScore] = useState(0);                           
    const [result, setResult] = useState(false);       
    const [timer, setTimer] = useState(10);               
    const timerRef = useRef(null);                        

    const Option1 = useRef(null)
    const Option2 = useRef(null)
    const Option3 = useRef(null)
    const option_array = [Option1, Option2, Option3];

    // shuffleArray fonksiyonu ile sorular karıştırılıyor
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Kullanıcı giriş yaptıktan sonra random şekilde sorular gelmeye başlıyor
    useEffect(() => {
        if (isLoggedIn) {
            const shuffled = shuffleArray(data);
            setShuffledData(shuffled);
            setQuestion(shuffled[0]);
        }
    }, [isLoggedIn]);

    // Her soru için 10 saniyelik bir süre var. Eğer süre içerisinde cevap verilmezse soru yanlış sayılıyor.
    useEffect(() => {
        if (!result && questions) {
            setTimer(10); 
            if (timerRef.current) clearInterval(timerRef.current); 
            timerRef.current = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(timerRef.current);
                        handleTimeout(); 
                    }
                    return prev - 1; 
                });
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [index, questions]);

    const handleTimeout = () => {
        if (lock == false) {
            // 10 saniye içerisinde cevap verilmezse doğru cevap gösterilir
            option_array[questions.answer - 1].current.classList.add("correct");
            setLock(true); 
        }
    };

    // Sadece buton ile değil enter tuşu ile de kontrolün sağlanması
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                if (!isLoggedIn && !isStarting && name.trim() !== '') {
                    handleStart(); // Başla
                } else if (isLoggedIn && !result && lock) {
                    nextQuestion(); // Next
                } else if (result) {
                    window.location.reload(); // Tekrar Dene
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [name, isLoggedIn, isStarting, lock, result]);

    // Cevap kontrol fonksiyonu
    const checkAns = (e, answer) => {
        if (lock == false) { 
            clearInterval(timerRef.current); // Cevap verildiğinde süreyi durdurma
            if (questions.answer === answer) {
                e.target.classList.add("correct");  // Doğru cevabın arkaplan rengi yeşil olur
                setScore(prev => prev + 1);         // Skor artar
            } else {
                e.target.classList.add("wrong");    // Yanlış cevabın arkaplan rengi kırmızı olur
                option_array[questions.answer - 1].current.classList.add("correct"); // Doğru cevabı gösterir
            }
            setLock(true); // Tekrar işaretleme olmaması için kilitlenir
        }
    }

    const nextQuestion = () => {
        if (index === shuffledData.length - 1) {
            setResult(true); // Son sorudan sonra sonuç gösterilir
            return;
        }

        // Önceki sorunun işaretlerini temizle
        option_array.forEach(option => {
            option.current.classList.remove("correct");
            option.current.classList.remove("wrong");
        });

        setLock(false);                    
        const newIndex = index + 1;        
        setIndex(newIndex);
        setQuestion(shuffledData[newIndex]); 
    };

    // Başlat butonuna basıldığında çalışır
    const handleStart = () => {
        if (name.trim() === '') {
            alert("Lütfen isim giriniz!"); // İsim girilmeden başlamaz ve hata verir
            return;
        }
        setIsStarting(true); 

        // Başla butonuna basıldıktan 3 saniye sonra quşz başaltılır
        setTimeout(() => {
            setIsLoggedIn(true);   
            setIsStarting(false);  
        }, 3000);
    }

    return (
        <div className='container'>
            {!isLoggedIn && !isStarting && (
                <div className="login">
                    <h1>İsminizi Giriniz</h1>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="İsminizi yazın"
                    />
                    <button onClick={handleStart} className="retry-button">Başla</button>
                </div>
            )}

            {!isLoggedIn && isStarting && (
                <h2>Quiz {name} için başlıyor...</h2>
            )}
            {isLoggedIn && (
                <>
                    <h1>Quiz - {name}</h1>
                    <hr />
                    {!result && <div className='timer'>Süre: {timer} saniye</div>}
                    {result ? (
                        <div className='result'>
                            <h2 className="result-text">Quiz Bitti!</h2>
                            <p className="result-text">Doğru Sayısı: {score}</p>
                            <p className="result-text">Yanlış Sayısı: {shuffledData.length - score}</p>
                            <p className="result-text">
                                Toplam Puan: {score * 5 - (shuffledData.length - score) * 2}
                            </p>
                            <button className="retry-button" onClick={() => window.location.reload()}>Tekrar Dene</button>
                        </div>
                    ) : (
                        questions && (
                            <>
                                <h2>{index + 1}. {questions.question}</h2>
                                <ul>
                                    <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{questions.options1}</li>
                                    <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{questions.options2}</li>
                                    <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{questions.options3}</li>
                                </ul>
                                <button className="next-button" onClick={nextQuestion} disabled={lock == false}>Next</button>
                                <div className='index'>{index + 1} of {shuffledData.length} questions</div>
                            </>
                        )
                    )}
                </>
            )}
        </div>
    )
}

export default Quiz;
