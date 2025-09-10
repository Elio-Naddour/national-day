import { useParams } from "react-router-dom";
import { Certificate, GenerateCertificate } from "../../utils/functions";
import { QnAData } from "../../database/QnAData";
import { useEffect, useState } from "react";
import classNames from 'classnames';
import './QnA.css';
import { ClusterPattern, TetrisPattern } from "../../components/patterns/patterns";

const qCount = 5;
const randomQuestions = QnAData.sort(() => Math.random() - 0.5).slice(0, qCount);

const QnAPage = () => { 
    
      const { name } = useParams();
      const [index,setIndex] = useState(0);
      const [time,setTime] = useState(10);
      const [selectedAnswer,setSelectedAnswer] = useState(null);
      const [gameEnd,setGameEnd] = useState(false);
      const [score,setScore] = useState({
          area1:{name:'الشرقية',number:0},
          area2:{name:'الغربية',number:0},
          area3:{name:'الوسطى',number:0},
          area4:{name:'الشمالية',number:0},
          area5:{name:'الجنوبية',number:0},
      })
      const total = qCount;

      const onAnswerClick = (answer) => {
        setTime(10); // reset countdown

        setScore((prev) => {
          const updated = { ...prev };

          for (let key in updated) {
            if (updated[key].name === answer) {
              updated[key] = {
                ...updated[key],
                number: updated[key].number + 1,
              };
            }
          }

          return updated;
        });
        
        if(index==randomQuestions.length-1){
          setGameEnd(true)
          return 
        }
        
        setSelectedAnswer(answer)
        setTimeout(() => {
          setSelectedAnswer(null)
          setIndex(index+1);
          setTime(10); // reset countdown
          
        }, 1000);
      }

      useEffect(() => {
        if (time === 0) {
          // move to next question
          onAnswerClick('timeOut')
        }

        const interval = setInterval(() => {
          setTime((prev) => (prev > 0 ? prev - 1 : 10)); // reset when 0
        }, 1000);

        return () => clearInterval(interval); // cleanup
      }, [time, gameEnd, index]);

      const renderQuestions = () => {
        if(gameEnd){
          const resultString = ',تنوع يعكس غنى وطننا\n\nوهويتنا السعودية تجمعنا' + '\n\n' + ':نتيجة الفحص' + '\n\n' + 'DNA  الوطن' + '\n\n' + name + '\n\n' + Object.entries(score)
            .map(([key, value]) => {
              const percentage = Math.round((value.number * 100) / total); 
              return `%${value.name} : ${percentage}`;
            })
            .join("\n\n");

          return  (
            <div className={'end-game-container'}>     
              <div>
                {name}
                {Object.entries(score).map(([key, value]) => {
                  const percentage = Math.round((value.number * 100) / total); 
                  return (
                    <p key={key}>
                      {value.name} : {percentage}%
                    </p>
                  );
                })}
              </div> 
              <GenerateCertificate text={resultString} />
            </div>
          )
        }
        return (
          <div className="qna-container">
            <div className="question">
              {randomQuestions[index].question}
            </div>
            {time}
            <div className="answers">
              {randomQuestions[index].answers.map((answer) => (
                <button className={classNames({'answer':true, 'correct':answer===randomQuestions[index].correctAnswer && selectedAnswer})} disabled={selectedAnswer} onClick={() => onAnswerClick(answer)} key={answer}>{answer}</button>
              ))}
            </div>
          </div>
        )
      }

    return <div className="qna-page-container">
              {/* {!gameEnd && 
                <div className="patterns-container">
                  <ClusterPattern />
                  <ClusterPattern />
                  <ClusterPattern />
                </div>
              }   */}
             {renderQuestions()}
            </div>
}
export default QnAPage;