type ButtonProps = {
  text: string;
  type: 'light' | 'dark';
  handleClick: () => void;
}


export function Button({ text, type, handleClick }: ButtonProps) {

  const classNames = `btn btn-${type}`;

  return <button className={classNames} onClick={handleClick}>{text}</button>

}