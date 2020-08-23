import {h} from 'preact'

const Icons = ({ name, i, size=32, width, height, alt="", ...other }) => {
  return (
    <img 
      {...other}
      src={`/assets/icons/${i||name}.svg`} 
      alt={alt}
      width={`${width||size}`}
      height={`${height||size}`}
    />
  )
}

export default Icons
