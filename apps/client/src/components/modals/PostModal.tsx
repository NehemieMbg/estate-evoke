type PostModalProps = {
  onClose: () => void;
};

const PostModal: React.FC<PostModalProps> = ({ onClose }) => {
  return (
    <div className="">
      <p>PostModal</p>
      <button onClick={onClose}>test</button>
    </div>
  );
};
export default PostModal;
