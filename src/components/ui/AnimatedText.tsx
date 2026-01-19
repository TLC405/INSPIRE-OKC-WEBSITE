import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  animation?: 'chars' | 'words' | 'lines';
  staggerDelay?: number;
}

export const AnimatedText = ({
  text,
  className,
  as: Tag = 'span',
  animation = 'chars',
  staggerDelay = 0.03,
}: AnimatedTextProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const splitText = () => {
    if (animation === 'chars') {
      return text.split('').map((char, i) => (
        <span
          key={i}
          className={cn(
            'inline-block transition-all duration-500',
            isVisible
              ? 'opacity-100 translate-y-0 rotate-0'
              : 'opacity-0 translate-y-4 rotate-3'
          )}
          style={{
            transitionDelay: `${i * staggerDelay}s`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }

    if (animation === 'words') {
      return text.split(' ').map((word, i) => (
        <span
          key={i}
          className={cn(
            'inline-block transition-all duration-500 mr-[0.25em]',
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          )}
          style={{
            transitionDelay: `${i * staggerDelay * 3}s`,
          }}
        >
          {word}
        </span>
      ));
    }

    return (
      <span
        className={cn(
          'inline-block transition-all duration-700',
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        )}
      >
        {text}
      </span>
    );
  };

  return (
    <Tag ref={ref} className={cn('overflow-hidden', className)}>
      {splitText()}
    </Tag>
  );
};

// Reveal text with clip-path
export const RevealText = ({
  text,
  className,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <Tag
      ref={ref}
      className={cn(
        'block overflow-hidden',
        className
      )}
    >
      <span
        className={cn(
          'block transition-transform duration-700 ease-out',
          isVisible ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {text}
      </span>
    </Tag>
  );
};
