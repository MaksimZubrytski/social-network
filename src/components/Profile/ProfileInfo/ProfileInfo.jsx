import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus';

const ProfileInfo = ({profile, status, updateStatus}) => {
  if(!profile) {
    return <Preloader />
  }
    return (
    <div> 
      <div>
        <img src="https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg" alt="Earth" />
      </div>
      <div className={classes.description}>
        <img src={profile.photos.small} alt='avatar'/>
        <p>{profile.fullName}</p>
      </div>
      <ProfileStatus status={status} updateStatus={updateStatus}/>
    </div>
    )
}

export default ProfileInfo;