import bankLogo from '../../public/images/BankLogo.png'
import NationalDayLogo from '../../public/images/NDlogo.png'
import './header.css'

const Header = () => {
    return(
        <div className='header'>
            <img src={NationalDayLogo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
            <img src={bankLogo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
        </div>
    )
}
export default Header;