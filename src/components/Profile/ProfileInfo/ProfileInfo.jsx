import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
  if(!props.profile) {
    return <Preloader />
  }
    return (
    <div> 
      <div>
        <img src="https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg" alt="Earth" />
      </div>
      <div className={classes.description}>
        <img src={props.profile.photos.small} alt='avatar'/>
        <p>{props.profile.fullName}</p>
      </div>
      <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
    </div>
    )
}

export default ProfileInfo;