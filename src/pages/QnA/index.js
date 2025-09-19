import { useParams } from "react-router-dom";
import { Certificate, GenerateCertificate } from "../../utils/functions";
import { QnAData } from "../../database/QnAData";
import { useEffect, useState } from "react";
import classNames from 'classnames';
import './QnA.css';
import { ClusterPattern, TetrisPattern } from "../../components/patterns/patterns";

const qCount = 1;
const randomQuestions = QnAData.sort(() => Math.random() - 0.5).slice(0, qCount);

const QnAPage = () => { 
    
      const { name } = useParams();
      const [index,setIndex] = useState(0);
      const [total,setTotal] = useState(0);
      const [time,setTime] = useState(15);
      const [selectedAnswer,setSelectedAnswer] = useState(null);
      const [gameEnd,setGameEnd] = useState(false);
      const [isShowingAnswer,setIsShowingAnswer]= useState(false);
      const [score,setScore] = useState({
          east:{name:'الشرقية',number:0},
          west:{name:'الغربية',number:0},
          middle:{name:'الوسطى',number:0},
          north:{name:'الشمالية',number:0},
          south:{name:'الجنوبية',number:0},
      })

      useEffect(()=>{
        return()=>{setTotal(0)}
      },[])

      const onAnswerClick = (answer) => {
        setTime(15); // reset countdown
        if(answer !== 'timeOut') setTotal((prev)=> prev+=1)

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
        setIsShowingAnswer(true)
        setTimeout(() => {
          setSelectedAnswer(null)
          setIndex(index+1);
          setTime(15); // reset countdown
          setIsShowingAnswer(false)

        }, 4000);
      }

      useEffect(() => {
        if (time === 0) {
          // move to next question
          onAnswerClick('timeOut')
        }

        const interval = setInterval(() => {
          if(isShowingAnswer) return;
          setTime((prev) => (prev > 0 ? prev - 1 : 15)); // reset when 0
        }, 1000);

        return () => clearInterval(interval); // cleanup
      }, [time, gameEnd, index]);

      const renderQuestions = () => {
        if(gameEnd){
          const resultString = Object.entries(score)
            .map(([key, value]) => {
              const percentage = total === 0 ? 0 : Math.round((value.number * 100) / total); 
              return `% ${value.name} | ${percentage}`;
            })
            .join("\n");
            const rows = Object.entries(score).map(([key, value]) => {
              const percentage = total === 0 ? 0 : Math.round((value.number * 100) / total);
              return { name: value.name, percentage };
            });

          return  (
            <div className={'end-game-container'}>     
              <div>
                {name}
                {Object.entries(score).map(([key, value]) => {
                  const percentage = total === 0 ? 0 : Math.round((value.number * 100) / total); 
                  return (
                    <p key={key}>
                      {value.name} | {percentage}%
                    </p>
                  );
                })}
              </div> 
              <GenerateCertificate text={resultString} rows={rows} />
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