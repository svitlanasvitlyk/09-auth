import css from './ErrorMessage.module.css';

export default function Loader() {
  return <p className={css.text}>Loading notes, please wait...</p>;
}