import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import SignInCard from './components/sign-in-card';
import SignUpCard from './components/sign-up-card';

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <SignInCard setIsFlipped={setIsFlipped} />
      <SignUpCard setIsFlipped={setIsFlipped} />
    </ReactCardFlip>
  );
};

export default FlipCard;
