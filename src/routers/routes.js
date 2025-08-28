import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home';
import QnAPage from '../pages/QnA';

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customer/:name" element={<QnAPage />} />
        </Routes>
    )
}
export default AppRoutes;