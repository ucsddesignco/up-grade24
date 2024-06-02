import { RefObject, useEffect } from 'react';

type UseEyesFollowCursorProps = {
  pupilRefs: {
    pupil1Ref: RefObject<SVGGElement>;
    pupil2Ref: RefObject<SVGGElement>;
  };
  eyeRefs: {
    eye1Ref: RefObject<SVGSVGElement>;
    eye2Ref: RefObject<SVGSVGElement>;
  };
};

const EYE_RADIUS = 18.6305;

export const useEyesFollowCursor = ({
  pupilRefs,
  eyeRefs
}: UseEyesFollowCursorProps) => {
  const { pupil1Ref, pupil2Ref } = pupilRefs;
  const { eye1Ref, eye2Ref } = eyeRefs;

  useEffect(() => {
    const handleEyesFollowCursor = (e: MouseEvent) => {
      const eye1 = eye1Ref.current;
      const eye2 = eye2Ref.current;
      const pupil1 = pupil1Ref.current;
      const pupil2 = pupil2Ref.current;

      if (!eye1 || !eye2 || !pupil1 || !pupil2) return;

      const eye1Rect = eye1.getBoundingClientRect();
      const eye2Rect = eye2.getBoundingClientRect();
      const eye1CenterX = eye1Rect.left + eye1Rect.width / 2;
      const eye1CenterY = eye1Rect.top + eye1Rect.height / 2;
      const eye2CenterX = eye2Rect.left + eye2Rect.width / 2;
      const eye2CenterY = eye2Rect.top + eye2Rect.height / 2;

      const maxPupilDistance = EYE_RADIUS / 3.5;

      // Make one angle negative to make eyes look in different directions
      const angle1 = -Math.atan2(
        e.clientY - eye1CenterY,
        e.clientX - eye1CenterX
      );
      const angle2 = Math.atan2(
        e.clientY - eye2CenterY,
        e.clientX - eye2CenterX
      );
      const pupil1X = Math.cos(angle1) * maxPupilDistance;
      const pupil1Y = Math.sin(angle1) * maxPupilDistance;
      const pupil2X = Math.cos(angle2) * maxPupilDistance;
      const pupil2Y = Math.sin(angle2) * maxPupilDistance;

      pupil1.style.transform = `translate(${pupil1X}px, ${pupil1Y}px)`;
      pupil2.style.transform = `translate(${pupil2X}px, ${pupil2Y}px)`;
    };

    document.addEventListener('mousemove', handleEyesFollowCursor);
    return () => {
      document.removeEventListener('mousemove', handleEyesFollowCursor);
    };
  }, [eye1Ref, eye2Ref, pupil1Ref, pupil2Ref]);
};
