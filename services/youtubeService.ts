import type { TranscriptItem } from '../types';

export const parseYouTubeUrl = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return null;
  }
};

export const getDemoData = (videoId: string): { title: string; insights: string[]; transcript: TranscriptItem[] } => {
  return {
    title: `Understanding Quantum Computing`,
    insights: [
      'Quantum computing utilizes principles of quantum mechanics like superposition and entanglement to process information.',
      'Qubits, unlike classical bits, can represent both 0 and 1 simultaneously, enabling massive parallel computation.',
      'Key potential applications include drug discovery, materials science, financial modeling, and breaking complex cryptographic codes.',
      'Major challenges remain in building stable, error-corrected quantum computers, a field known as quantum error correction.',
      'While still in its infancy, quantum computing promises to revolutionize industries by solving problems currently intractable for even the most powerful supercomputers.'
    ],
    transcript: [
      { timestamp: '00:05', text: "Hello and welcome. Today, we're diving into the fascinating world of quantum computing." },
      { timestamp: '00:18', text: "Unlike classical computers that use bits, which can be either a 0 or a 1, quantum computers use qubits." },
      { timestamp: '00:32', text: "A qubit can exist in a superposition of both states at once. Think of it like a spinning coin before it lands." },
      { timestamp: '00:45', text: "This property allows quantum computers to perform many calculations simultaneously." },
      { timestamp: '01:02', text: "Another key concept is entanglement, where two qubits become linked in a way that their fates are intertwined, no matter the distance between them." },
      { timestamp: '01:20', text: "Einstein famously called this 'spooky action at a distance'." },
      { timestamp: '01:35', text: "So, what are the real-world applications? Imagine designing new molecules for medicine..." },
      { timestamp: '01:51', text: "...or creating new materials with incredible properties. The possibilities are truly mind-boggling." },
      { timestamp: '02:10', text: "However, building these machines is incredibly difficult. Qubits are fragile and sensitive to their environment." },
      { timestamp: '02:25', text: "This 'decoherence' causes errors in computation, which is a major hurdle for scientists to overcome." }
    ]
  };
};
