import { ConjugationDetails } from '../model/conjugationDetails';
import { Person } from '../model/verbForm';
import { conjugateEn } from './conjugation';
import { VerbEn } from './model/verb';

describe('English conjugation', () => {
  describe('infinitives', () => {
    it('should build the infinitive of a simple verb', () => {
      expect(conjugateEn('say', 'infinitive')).toEqual('say');
    });

    it('should build the infinitive of a verb with details', () => {
      const verb: ConjugationDetails = {
        infinitive: 'say'
      };
      expect(conjugateEn(verb, 'infinitive')).toEqual('say');
    });
  });

  describe('present conjugation of simple verbs', () => {
    it('should conjugate the regular say', () => {
      expect(conjugatePresent('say', '1s')).toEqual('I say');
      expect(conjugatePresent('say', '2s')).toEqual('you say');
      expect(conjugatePresent('say', '3s')).toEqual('he / she says');
      expect(conjugatePresent('say', '1p')).toEqual('we say');
      expect(conjugatePresent('say', '2p')).toEqual('you say');
      expect(conjugatePresent('say', '3p')).toEqual('they say');
    });

    it('should conjugate the regular boo', () => {
      expect(conjugatePresent('boo', '1s')).toEqual('I boo');
      expect(conjugatePresent('boo', '2s')).toEqual('you boo');
      expect(conjugatePresent('boo', '3s')).toEqual('he / she boos');
      expect(conjugatePresent('boo', '1p')).toEqual('we boo');
      expect(conjugatePresent('boo', '2p')).toEqual('you boo');
      expect(conjugatePresent('boo', '3p')).toEqual('they boo');
    });

    it('should conjugate the e-extension do', () => {
      expect(conjugatePresent('do', '1s')).toEqual('I do');
      expect(conjugatePresent('do', '2s')).toEqual('you do');
      expect(conjugatePresent('do', '3s')).toEqual('he / she does');
      expect(conjugatePresent('do', '1p')).toEqual('we do');
      expect(conjugatePresent('do', '2p')).toEqual('you do');
      expect(conjugatePresent('do', '3p')).toEqual('they do');
    });

    it('should conjugate the e-extension teach', () => {
      expect(conjugatePresent('teach', '1s')).toEqual('I teach');
      expect(conjugatePresent('teach', '2s')).toEqual('you teach');
      expect(conjugatePresent('teach', '3s')).toEqual('he / she teaches');
      expect(conjugatePresent('teach', '1p')).toEqual('we teach');
      expect(conjugatePresent('teach', '2p')).toEqual('you teach');
      expect(conjugatePresent('teach', '3p')).toEqual('they teach');
    });

    it('should conjugate the y-replacement rely', () => {
      expect(conjugatePresent('rely', '1s')).toEqual('I rely');
      expect(conjugatePresent('rely', '2s')).toEqual('you rely');
      expect(conjugatePresent('rely', '3s')).toEqual('he / she relies');
      expect(conjugatePresent('rely', '1p')).toEqual('we rely');
      expect(conjugatePresent('rely', '2p')).toEqual('you rely');
      expect(conjugatePresent('rely', '3p')).toEqual('they rely');
    });

    it('should conjugate the y-replacement worry', () => {
      expect(conjugatePresent('worry', '1s')).toEqual('I worry');
      expect(conjugatePresent('worry', '2s')).toEqual('you worry');
      expect(conjugatePresent('worry', '3s')).toEqual('he / she worries');
      expect(conjugatePresent('worry', '1p')).toEqual('we worry');
      expect(conjugatePresent('worry', '2p')).toEqual('you worry');
      expect(conjugatePresent('worry', '3p')).toEqual('they worry');
    });
  });

  describe('present conjugation of modal and irregular verbs', () => {
    it('should conjugate the modal can', () => {
      const verb: ConjugationDetails = {
        infinitive: 'can',
        present: {
          '3s': 'can'
        }
      };

      expect(conjugatePresent(verb, '1s')).toEqual('I can');
      expect(conjugatePresent(verb, '2s')).toEqual('you can');
      expect(conjugatePresent(verb, '3s')).toEqual('he / she can');
      expect(conjugatePresent(verb, '1p')).toEqual('we can');
      expect(conjugatePresent(verb, '2p')).toEqual('you can');
      expect(conjugatePresent(verb, '3p')).toEqual('they can');
    });

    it('should conjugate the irregular have', () => {
      const verb: ConjugationDetails = {
        infinitive: 'have',
        present: {
          '3s': 'has'
        }
      };

      expect(conjugatePresent(verb, '1s')).toEqual('I have');
      expect(conjugatePresent(verb, '2s')).toEqual('you have');
      expect(conjugatePresent(verb, '3s')).toEqual('he / she has');
      expect(conjugatePresent(verb, '1p')).toEqual('we have');
      expect(conjugatePresent(verb, '2p')).toEqual('you have');
      expect(conjugatePresent(verb, '3p')).toEqual('they have');
    });

    it('should conjugate the irregular be', () => {
      const verb: ConjugationDetails = {
        infinitive: 'be',
        present: {
          '1s': 'am',
          '2s': 'are',
          '3s': 'is',
          '1p': 'are',
          '2p': 'are',
          '3p': 'are'
        }
      };

      expect(conjugatePresent(verb, '1s')).toEqual('I am');
      expect(conjugatePresent(verb, '2s')).toEqual('you are');
      expect(conjugatePresent(verb, '3s')).toEqual('he / she is');
      expect(conjugatePresent(verb, '1p')).toEqual('we are');
      expect(conjugatePresent(verb, '2p')).toEqual('you are');
      expect(conjugatePresent(verb, '3p')).toEqual('they are');
    });
  });

  const conjugatePresent = (verb: VerbEn, person: Person): string =>
    conjugateEn(verb, { person, tense: 'present' });
});
