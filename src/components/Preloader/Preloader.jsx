import preloader from '../../assets/img/preloader.svg'
import classes from './Preloader.module.scss'

const Preloader = () => {
    return(
        <div className={classes.preloader}>
            <img src={preloader} alt="Loading"/>
        </div>
    )
}

export default Preloader