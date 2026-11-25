// Each exam flies an International Code of Signals flag. The single-letter meanings are
// from the ICS; the pairing with each exam is just a nod to what the exam covers.
const B = '#1a47c2', R = '#c62a32', Y = '#f2c230', W = '#fff';

export const FLAGS = {
  tech: {
    letter: 'G', name: 'Golf',
    meaning: 'I require a pilot. Chosen for the first license.',
    svg: [0, 1, 2, 3, 4, 5].map(i => `<rect x="${i * 10}" width="10" height="40" fill="${i % 2 ? B : Y}"/>`).join(''),
  },
  extra: {
    letter: 'H', name: 'Hotel',
    meaning: 'I have a pilot on board. Chosen for the top license.',
    svg: `<rect width="30" height="40" fill="${W}"/><rect x="30" width="30" height="40" fill="${R}"/>`,
  },
  e1: {
    letter: 'P', name: 'Papa',
    meaning: 'In harbour: all persons report on board, the vessel is about to put to sea.',
    svg: `<rect width="60" height="40" fill="${B}"/><rect x="15" y="10" width="30" height="20" fill="${W}"/>`,
  },
  e3: {
    letter: 'K', name: 'Kilo',
    meaning: 'I wish to communicate with you.',
    svg: `<rect width="30" height="40" fill="${Y}"/><rect x="30" width="30" height="40" fill="${B}"/>`,
  },
  e7: {
    letter: 'U', name: 'Uniform',
    meaning: 'You are running into danger.',
    svg: `<rect width="60" height="40" fill="${W}"/><rect width="30" height="20" fill="${R}"/><rect x="30" y="20" width="30" height="20" fill="${R}"/>`,
  },
  e8: {
    letter: 'E', name: 'Echo',
    meaning: 'I am altering my course to starboard. Chosen for radar echoes.',
    svg: `<rect width="60" height="20" fill="${B}"/><rect y="20" width="60" height="20" fill="${R}"/>`,
  },
  gen: {
    letter: 'Q', name: 'Quebec',
    meaning: 'My vessel is healthy and I request free pratique. Chosen for Q-codes and CQ.',
    svg: `<rect width="60" height="40" fill="${Y}"/>`,
  },
};

export const flagSvg = id => {
  const f = FLAGS[id];
  return `<svg class="flag" viewBox="0 0 60 40" role="img" aria-label="Signal flag ${f.letter}"><title>${f.letter} (${f.name}): ${f.meaning}</title>${f.svg}</svg>`;
};
