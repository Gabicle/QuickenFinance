type ButtonProps = {
  text: string;
  classes: string;
  handleClick: () => void;
}


export function Button({ text, classes, handleClick }: ButtonProps) {

  const classNames = `btn ${classes}`;

  return <button className={classNames} onClick={handleClick}>{text}</button>

}