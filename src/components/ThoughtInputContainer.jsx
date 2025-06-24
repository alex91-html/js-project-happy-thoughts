import { useState } from "react";
import ThoughtInput from "./ThoughtInput";
import Modal from "./Modal";
import AuthForm from "./AuthForm";

const ThoughtInputContainer = ({ accessToken, onAddThought, onAuthSuccess, username }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Handler for posting a thought
  const handleAddThought = async (thoughtText) => {
    try {
      await onAddThought(thoughtText);
      setText("");
      setError("");
    } catch {
      setError("Failed to send your thought. Please try again!");
    }
  };

  // Handler for showing the auth modal
  const handleShowAuthModal = () => {
    setError("");
    setShowAuthModal(true);
  };

  // Handler for closing the auth modal
  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  // Handler for successful auth
  const handleAuthSuccess = (token, user) => {
    if (onAuthSuccess) onAuthSuccess(token, user);
    setShowAuthModal(false);
  };

  return (
    <div>
      <ThoughtInput
        onAddThought={handleAddThought}
        accessToken={accessToken}
        onShowAuthModal={handleShowAuthModal}
        text={text}
        setText={setText}
        error={error}
        setError={setError}
        username={username}
      />
      <Modal isOpen={showAuthModal} onClose={handleCloseAuthModal}>
        <AuthForm onAuthSuccess={handleAuthSuccess} onClose={handleCloseAuthModal} />
      </Modal>
    </div>
  );
};

export default ThoughtInputContainer; 