import { Person } from '../model/verbForm';
import { conjugateFaRm } from './conjugation';

describe('Romanized Farsi conjugation', () => {
  describe('infinitives', () => {
    it('should build the infinitive of a simple verb', () => {
      expect(conjugateFaRm({ infinitive: 'goftan', presentStem: 'go' }, 'infinitive')).toEqual('goftan');
    });
  });

  describe('present conjugation of simple verbs', () => {
    it('should conjugate the regular raftan', () => {
      expect(conjugatePresent('raftan', 'rav', '1s')).toEqual('man miravam');
      expect(conjugatePresent('raftan', 'rav', '2s')).toEqual('to miravi');
      expect(conjugatePresent('raftan', 'rav', '3s')).toEqual('u miravad');
      expect(conjugatePresent('raftan', 'rav', '1p')).toEqual('mâ miravim');
      expect(conjugatePresent('raftan', 'rav', '2p')).toEqual('shomâ miravid');
      expect(conjugatePresent('raftan', 'rav', '3p')).toEqual('ânhâ miravand');
    });

    it('should conjugate the regular didan', () => {
      expect(conjugatePresent('didan', 'bin', '1s')).toEqual('man mibinam');
      expect(conjugatePresent('didan', 'bin', '2s')).toEqual('to mibini');
      expect(conjugatePresent('didan', 'bin', '3s')).toEqual('u mibinad');
      expect(conjugatePresent('didan', 'bin', '1p')).toEqual('mâ mibinim');
      expect(conjugatePresent('didan', 'bin', '2p')).toEqual('shomâ mibinid');
      expect(conjugatePresent('didan', 'bin', '3p')).toEqual('ânhâ mibinand');
    });

    it('should conjugate the y-extension âmadan', () => {
      expect(conjugatePresent('âmadan', 'â', '1s')).toEqual('man miâyam');
      expect(conjugatePresent('âmadan', 'â', '2s')).toEqual('to miâyi');
      expect(conjugatePresent('âmadan', 'â', '3s')).toEqual('u miâyad');
      expect(conjugatePresent('âmadan', 'â', '1p')).toEqual('mâ miâyim');
      expect(conjugatePresent('âmadan', 'â', '2p')).toEqual('shomâ miâyid');
      expect(conjugatePresent('âmadan', 'â', '3p')).toEqual('ânhâ miâyand');
    });

    it('should conjugate the y-extension goftan', () => {
      expect(conjugatePresent('goftan', 'gu', '1s')).toEqual('man miguyam');
      expect(conjugatePresent('goftan', 'gu', '2s')).toEqual('to miguyi');
      expect(conjugatePresent('goftan', 'gu', '3s')).toEqual('u miguyad');
      expect(conjugatePresent('goftan', 'gu', '1p')).toEqual('mâ miguyim');
      expect(conjugatePresent('goftan', 'gu', '2p')).toEqual('shomâ miguyid');
      expect(conjugatePresent('goftan', 'gu', '3p')).toEqual('ânhâ miguyand');
    });
  });

  describe('present conjugation of combined verbs', () => {
    xit('should conjugate the regular anfragen', () => {
      // expect(conjugatePresent('an|fragen', '1s')).toEqual('ich frage an');
      // expect(conjugatePresent('an|fragen', '2s')).toEqual('du fragst an');
      // expect(conjugatePresent('an|fragen', '3s')).toEqual('er / sie fragt an');
      // expect(conjugatePresent('an|fragen', '1p')).toEqual('wir fragen an');
      // expect(conjugatePresent('an|fragen', '2p')).toEqual('ihr fragt an');
      // expect(conjugatePresent('an|fragen', '3p')).toEqual('sie fragen an');
    });
  });

  describe('present conjugation of irregular verbs', () => {
    xit('should conjugate essen', () => {
      // const verb: VerbFaRm = {
      //   infinitive: 'essen',
      //   present: {
      //     '3s': 'isst'
      //   }
      // };

      // expect(conjugatePresent(verb, '1s')).toEqual('ich esse');
      // expect(conjugatePresent(verb, '2s')).toEqual('du isst');
      // expect(conjugatePresent(verb, '3s')).toEqual('er / sie isst');
      // expect(conjugatePresent(verb, '1p')).toEqual('wir essen');
      // expect(conjugatePresent(verb, '2p')).toEqual('ihr esst');
      // expect(conjugatePresent(verb, '3p')).toEqual('sie essen');
    });
  });

  const conjugatePresent = (infinitive: string, presentStem: string, person: Person): string =>
    conjugateFaRm({ infinitive, presentStem}, { person, tense: 'present' });
});
