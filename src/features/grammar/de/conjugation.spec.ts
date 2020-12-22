import { ConjugationDetails } from '../model/conjugationDetails';
import { Person } from '../model/verbForm';
import { conjugateDe } from './conjugation';
import { VerbDe } from './model/verb';

describe('German conjugation', () => {
  describe('infinitives', () => {
    it('should build the infinitive of a simple verb', () => {
      expect(conjugateDe('sagen', 'infinitive')).toEqual('sagen');
    });

    it('should build the infinitive of a verb with details', () => {
      const verb: ConjugationDetails = {
        infinitive: 'sagen'
      };
      expect(conjugateDe(verb, 'infinitive')).toEqual('sagen');
    });

    it('should build the infinitive of a split verb', () => {
      expect(conjugateDe('an|sagen', 'infinitive')).toEqual('ansagen');
    });
  });

  describe('present conjugation of simple verbs', () => {
    it('should conjugate the regular fragen', () => {
      expect(conjugatePresent('fragen', '1s')).toEqual('ich frage');
      expect(conjugatePresent('fragen', '2s')).toEqual('du fragst');
      expect(conjugatePresent('fragen', '3s')).toEqual('er / sie fragt');
      expect(conjugatePresent('fragen', '1p')).toEqual('wir fragen');
      expect(conjugatePresent('fragen', '2p')).toEqual('ihr fragt');
      expect(conjugatePresent('fragen', '3p')).toEqual('sie fragen');
    });

    it('should conjugate the e-extension warten', () => {
      expect(conjugatePresent('warten', '1s')).toEqual('ich warte');
      expect(conjugatePresent('warten', '2s')).toEqual('du wartest');
      expect(conjugatePresent('warten', '3s')).toEqual('er / sie wartet');
      expect(conjugatePresent('warten', '1p')).toEqual('wir warten');
      expect(conjugatePresent('warten', '2p')).toEqual('ihr wartet');
      expect(conjugatePresent('warten', '3p')).toEqual('sie warten');
    });

    it('should conjugate the e-extension reden', () => {
      expect(conjugatePresent('reden', '1s')).toEqual('ich rede');
      expect(conjugatePresent('reden', '2s')).toEqual('du redest');
      expect(conjugatePresent('reden', '3s')).toEqual('er / sie redet');
      expect(conjugatePresent('reden', '1p')).toEqual('wir reden');
      expect(conjugatePresent('reden', '2p')).toEqual('ihr redet');
      expect(conjugatePresent('reden', '3p')).toEqual('sie reden');
    });

    it('should conjugate the s-omit reisen', () => {
      expect(conjugatePresent('reisen', '1s')).toEqual('ich reise');
      expect(conjugatePresent('reisen', '2s')).toEqual('du reist');
      expect(conjugatePresent('reisen', '3s')).toEqual('er / sie reist');
      expect(conjugatePresent('reisen', '1p')).toEqual('wir reisen');
      expect(conjugatePresent('reisen', '2p')).toEqual('ihr reist');
      expect(conjugatePresent('reisen', '3p')).toEqual('sie reisen');
    });

    it('should conjugate the s-omit tanzen', () => {
      expect(conjugatePresent('tanzen', '1s')).toEqual('ich tanze');
      expect(conjugatePresent('tanzen', '2s')).toEqual('du tanzt');
      expect(conjugatePresent('tanzen', '3s')).toEqual('er / sie tanzt');
      expect(conjugatePresent('tanzen', '1p')).toEqual('wir tanzen');
      expect(conjugatePresent('tanzen', '2p')).toEqual('ihr tanzt');
      expect(conjugatePresent('tanzen', '3p')).toEqual('sie tanzen');
    });

    it('should conjugate the e-extension atmen', () => {
      expect(conjugatePresent('atmen', '1s')).toEqual('ich atme');
      expect(conjugatePresent('atmen', '2s')).toEqual('du atmest');
      expect(conjugatePresent('atmen', '3s')).toEqual('er / sie atmet');
      expect(conjugatePresent('atmen', '1p')).toEqual('wir atmen');
      expect(conjugatePresent('atmen', '2p')).toEqual('ihr atmet');
      expect(conjugatePresent('atmen', '3p')).toEqual('sie atmen');
    });

    it('should conjugate the e-extension öffnen', () => {
      expect(conjugatePresent('öffnen', '1s')).toEqual('ich öffne');
      expect(conjugatePresent('öffnen', '2s')).toEqual('du öffnest');
      expect(conjugatePresent('öffnen', '3s')).toEqual('er / sie öffnet');
      expect(conjugatePresent('öffnen', '1p')).toEqual('wir öffnen');
      expect(conjugatePresent('öffnen', '2p')).toEqual('ihr öffnet');
      expect(conjugatePresent('öffnen', '3p')).toEqual('sie öffnen');
    });

    it('should conjugate the regular kommen', () => {
      expect(conjugatePresent('kommen', '1s')).toEqual('ich komme');
      expect(conjugatePresent('kommen', '2s')).toEqual('du kommst');
      expect(conjugatePresent('kommen', '3s')).toEqual('er / sie kommt');
      expect(conjugatePresent('kommen', '1p')).toEqual('wir kommen');
      expect(conjugatePresent('kommen', '2p')).toEqual('ihr kommt');
      expect(conjugatePresent('kommen', '3p')).toEqual('sie kommen');
    });

    it('should conjugate the regular lernen', () => {
      expect(conjugatePresent('lernen', '1s')).toEqual('ich lerne');
      expect(conjugatePresent('lernen', '2s')).toEqual('du lernst');
      expect(conjugatePresent('lernen', '3s')).toEqual('er / sie lernt');
      expect(conjugatePresent('lernen', '1p')).toEqual('wir lernen');
      expect(conjugatePresent('lernen', '2p')).toEqual('ihr lernt');
      expect(conjugatePresent('lernen', '3p')).toEqual('sie lernen');
    });

    it('should conjugate the regular qualmen', () => {
      expect(conjugatePresent('qualmen', '1s')).toEqual('ich qualme');
      expect(conjugatePresent('qualmen', '2s')).toEqual('du qualmst');
      expect(conjugatePresent('qualmen', '3s')).toEqual('er / sie qualmt');
      expect(conjugatePresent('qualmen', '1p')).toEqual('wir qualmen');
      expect(conjugatePresent('qualmen', '2p')).toEqual('ihr qualmt');
      expect(conjugatePresent('qualmen', '3p')).toEqual('sie qualmen');
    });

    it('should conjugate the e-omit sammeln', () => {
      expect(conjugatePresent('sammeln', '1s')).toEqual('ich sammle');
      expect(conjugatePresent('sammeln', '2s')).toEqual('du sammelst');
      expect(conjugatePresent('sammeln', '3s')).toEqual('er / sie sammelt');
      expect(conjugatePresent('sammeln', '1p')).toEqual('wir sammeln');
      expect(conjugatePresent('sammeln', '2p')).toEqual('ihr sammelt');
      expect(conjugatePresent('sammeln', '3p')).toEqual('sie sammeln');
    });

    it('should conjugate the e-omit tun', () => {
      expect(conjugatePresent('tun', '1s')).toEqual('ich tue');
      expect(conjugatePresent('tun', '2s')).toEqual('du tust');
      expect(conjugatePresent('tun', '3s')).toEqual('er / sie tut');
      expect(conjugatePresent('tun', '1p')).toEqual('wir tun');
      expect(conjugatePresent('tun', '2p')).toEqual('ihr tut');
      expect(conjugatePresent('tun', '3p')).toEqual('sie tun');
    });
  });

  describe('present conjugation of split verbs', () => {
    it('should conjugate the regular anfragen', () => {
      expect(conjugatePresent('an|fragen', '1s')).toEqual('ich frage an');
      expect(conjugatePresent('an|fragen', '2s')).toEqual('du fragst an');
      expect(conjugatePresent('an|fragen', '3s')).toEqual('er / sie fragt an');
      expect(conjugatePresent('an|fragen', '1p')).toEqual('wir fragen an');
      expect(conjugatePresent('an|fragen', '2p')).toEqual('ihr fragt an');
      expect(conjugatePresent('an|fragen', '3p')).toEqual('sie fragen an');
    });

    it('should conjugate the e-extension ausatmen', () => {
      expect(conjugatePresent('aus|atmen', '1s')).toEqual('ich atme aus');
      expect(conjugatePresent('aus|atmen', '2s')).toEqual('du atmest aus');
      expect(conjugatePresent('aus|atmen', '3s')).toEqual('er / sie atmet aus');
      expect(conjugatePresent('aus|atmen', '1p')).toEqual('wir atmen aus');
      expect(conjugatePresent('aus|atmen', '2p')).toEqual('ihr atmet aus');
      expect(conjugatePresent('aus|atmen', '3p')).toEqual('sie atmen aus');
    });

    it('should conjugate the e-omit aufsammeln', () => {
      expect(conjugatePresent('auf|sammeln', '1s')).toEqual('ich sammle auf');
      expect(conjugatePresent('auf|sammeln', '2s')).toEqual('du sammelst auf');
      expect(conjugatePresent('auf|sammeln', '3s')).toEqual('er / sie sammelt auf');
      expect(conjugatePresent('auf|sammeln', '1p')).toEqual('wir sammeln auf');
      expect(conjugatePresent('auf|sammeln', '2p')).toEqual('ihr sammelt auf');
      expect(conjugatePresent('auf|sammeln', '3p')).toEqual('sie sammeln auf');
    });

    it('should conjugate the e-omit abtun', () => {
      expect(conjugatePresent('ab|tun', '1s')).toEqual('ich tue ab');
      expect(conjugatePresent('ab|tun', '2s')).toEqual('du tust ab');
      expect(conjugatePresent('ab|tun', '3s')).toEqual('er / sie tut ab');
      expect(conjugatePresent('ab|tun', '1p')).toEqual('wir tun ab');
      expect(conjugatePresent('ab|tun', '2p')).toEqual('ihr tut ab');
      expect(conjugatePresent('ab|tun', '3p')).toEqual('sie tun ab');
    });
  });

  describe('present conjugation of mixed and irregular verbs', () => {
    it('should conjugate essen', () => {
      const verb: ConjugationDetails = {
        infinitive: 'essen',
        present: {
          '3s': 'isst'
        }
      };

      expect(conjugatePresent(verb, '1s')).toEqual('ich esse');
      expect(conjugatePresent(verb, '2s')).toEqual('du isst');
      expect(conjugatePresent(verb, '3s')).toEqual('er / sie isst');
      expect(conjugatePresent(verb, '1p')).toEqual('wir essen');
      expect(conjugatePresent(verb, '2p')).toEqual('ihr esst');
      expect(conjugatePresent(verb, '3p')).toEqual('sie essen');
    });

    it('should conjugate sehen', () => {
      const verb: ConjugationDetails = {
        infinitive: 'sehen',
        present: {
          '3s': 'sieht'
        }
      };

      expect(conjugatePresent(verb, '1s')).toEqual('ich sehe');
      expect(conjugatePresent(verb, '2s')).toEqual('du siehst');
      expect(conjugatePresent(verb, '3s')).toEqual('er / sie sieht');
      expect(conjugatePresent(verb, '1p')).toEqual('wir sehen');
      expect(conjugatePresent(verb, '2p')).toEqual('ihr seht');
      expect(conjugatePresent(verb, '3p')).toEqual('sie sehen');
    });

    it('should conjugate the split ansehen', () => {
      const verb: ConjugationDetails = {
        infinitive: 'an|sehen',
        present: {
          '3s': 'sieht an'
        }
      };

      expect(conjugatePresent(verb, '1s')).toEqual('ich sehe an');
      expect(conjugatePresent(verb, '2s')).toEqual('du siehst an');
      expect(conjugatePresent(verb, '3s')).toEqual('er / sie sieht an');
      expect(conjugatePresent(verb, '1p')).toEqual('wir sehen an');
      expect(conjugatePresent(verb, '2p')).toEqual('ihr seht an');
      expect(conjugatePresent(verb, '3p')).toEqual('sie sehen an');
    });

    it('should conjugate the irregular sein', () => {
      const verb: ConjugationDetails = {
        infinitive: 'sein',
        present: {
          '1s': 'bin',
          '2s': 'bist',
          '3s': 'ist',
          '1p': 'sind',
          '2p': 'seid',
          '3p': 'sind'
        }
      };

      expect(conjugatePresent(verb, '1s')).toEqual('ich bin');
      expect(conjugatePresent(verb, '2s')).toEqual('du bist');
      expect(conjugatePresent(verb, '3s')).toEqual('er / sie ist');
      expect(conjugatePresent(verb, '1p')).toEqual('wir sind');
      expect(conjugatePresent(verb, '2p')).toEqual('ihr seid');
      expect(conjugatePresent(verb, '3p')).toEqual('sie sind');
    });

    it('should handle special characters in the verb definition', () => {
      const verb: ConjugationDetails = {
        infinitive: '[an/ab]|sehen',
        present: {
          '3s': 'sieht [an/ab]'
        }
      };

      expect(conjugatePresent(verb, '1s')).toEqual('ich sehe [an/ab]');
      expect(conjugatePresent(verb, '2s')).toEqual('du siehst [an/ab]');
      expect(conjugatePresent(verb, '3s')).toEqual('er / sie sieht [an/ab]');
      expect(conjugatePresent(verb, '1p')).toEqual('wir sehen [an/ab]');
      expect(conjugatePresent(verb, '2p')).toEqual('ihr seht [an/ab]');
      expect(conjugatePresent(verb, '3p')).toEqual('sie sehen [an/ab]');
    });
  });

  const conjugatePresent = (verb: VerbDe, person: Person): string =>
    conjugateDe(verb, { person, tense: 'present' });
});
