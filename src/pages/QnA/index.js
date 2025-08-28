import { useParams } from "react-router-dom";
import { Certificate } from "../../utils/functions";

// الشرقية
// الغربية
// الوسطى
// الشمالية
// الجنوبية

const QnAPage = () => { 
    
      const { name } = useParams();

    
    return <div>
                {name}
                <Certificate />
                <div lang="ar" style={{ fontFamily: "Frutiger LT Arabic", fontWeight: 700 }}>
                مرحباً بالعالم
                </div>
            </div>
}
export default QnAPage;