import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MoblieTabBar.css';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const MoblieTabBar = ({pageNow})=>{


  return(
    <div className='TabBar-container'>
      <Link className={`TabBar-box ${pageNow === '/' ? 'tabBar-active' : ''}`} to={'/'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faHouse} /></span>
        <div className='TabBar-title '>홈</div>
      </Link>

      <Link className={`TabBar-box ${pageNow === '/moim' ? 'tabBar-active' : ''}`} to={'/moim'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faUserGroup} /></span>
        <div className='TabBar-title'>소모임</div>
      </Link>

      <Link className={`TabBar-box ${pageNow === '/mento' ? 'tabBar-active' : ''}`} to={'/'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faBookOpen} /></span>
        <div className='TabBar-title'>멘토링</div>
      </Link>

      <Link className={`TabBar-box ${pageNow === '/frBoard' ? 'tabBar-active' : ''}`} to={'/'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faList} /></span>
        <div className='TabBar-title'>자유게시판</div>
      </Link>

      <Link className={`TabBar-box ${pageNow === '/my' ? 'tabBar-active' : ''}`} to={'/'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faCircleUser} /></span>
        <div className='TabBar-title'>마이페이지</div>
      </Link>
    </div>
  );
}

export default MoblieTabBar;