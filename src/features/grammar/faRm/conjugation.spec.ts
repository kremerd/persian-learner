import { VerbFa } from '../fa/model/verb';
import { Person } from '../model/verbForm';
import { conjugateFaRm } from './conjugation';

describe('Romanized Farsi conjugation', () => {
  describe('infinitives', () => {
    it('should build the infinitive of a simple verb', () => {
      expect(conjugateFaRm({ infinitive: 'goftan', presentStem: 'go' }, 'infinitive')).toEqual('goftan');
    });

    it('should build the infinitive of a split verb', () => {
      expect(conjugateFaRm({ infinitive: 'bar|gashtan', presentStem: 'bar|gard' }, 'infinitive')).toEqual('bargashtan');
    });
  });

  describe('present conjugation of simple verbs', () => {
    it('should conjugate the regular raftan', () => {
      expect(conjugatePresent('rav', '1s')).toEqual('man miravam');
      expect(conjugatePresent('rav', '2s')).toEqual('to miravi');
      expect(conjugatePresent('rav', '3s')).toEqual('u miravad');
      expect(conjugatePresent('rav', '1p')).toEqual('mâ miravim');
      expect(conjugatePresent('rav', '2p')).toEqual('shomâ miravid');
      expect(conjugatePresent('rav', '3p')).toEqual('ânhâ miravand');
    });

    it('should conjugate the regular didan', () => {
      expect(conjugatePresent('bin', '1s')).toEqual('man mibinam');
      expect(conjugatePresent('bin', '2s')).toEqual('to mibini');
      expect(conjugatePresent('bin', '3s')).toEqual('u mibinad');
      expect(conjugatePresent('bin', '1p')).toEqual('mâ mibinim');
      expect(conjugatePresent('bin', '2p')).toEqual('shomâ mibinid');
      expect(conjugatePresent('bin', '3p')).toEqual('ânhâ mibinand');
    });

    it('should conjugate the y-extension âmadan', () => {
      expect(conjugatePresent('â', '1s')).toEqual('man miâyam');
      expect(conjugatePresent('â', '2s')).toEqual('to miâyi');
      expect(conjugatePresent('â', '3s')).toEqual('u miâyad');
      expect(conjugatePresent('â', '1p')).toEqual('mâ miâyim');
      expect(conjugatePresent('â', '2p')).toEqual('shomâ miâyid');
      expect(conjugatePresent('â', '3p')).toEqual('ânhâ miâyand');
    });

    it('should conjugate the y-extension goftan', () => {
      expect(conjugatePresent('gu', '1s')).toEqual('man miguyam');
      expect(conjugatePresent('gu', '2s')).toEqual('to miguyi');
      expect(conjugatePresent('gu', '3s')).toEqual('u miguyad');
      expect(conjugatePresent('gu', '1p')).toEqual('mâ miguyim');
      expect(conjugatePresent('gu', '2p')).toEqual('shomâ miguyid');
      expect(conjugatePresent('gu', '3p')).toEqual('ânhâ miguyand');
    });
  });

  describe('present conjugation of split verbs', () => {
    it('should conjugate the regular bargashtan', () => {
      expect(conjugatePresent('bar|gard', '1s')).toEqual('man barmigardam');
      expect(conjugatePresent('bar|gard', '2s')).toEqual('to barmigardi');
      expect(conjugatePresent('bar|gard', '3s')).toEqual('u barmigardad');
      expect(conjugatePresent('bar|gard', '1p')).toEqual('mâ barmigardim');
      expect(conjugatePresent('bar|gard', '2p')).toEqual('shomâ barmigardid');
      expect(conjugatePresent('bar|gard', '3p')).toEqual('ânhâ barmigardand');
    });
  });

  describe('present conjugation of combined verbs', () => {
    it('should conjugate the regular bâzi kardan', () => {
      expect(conjugatePresent('bâzi kon', '1s')).toEqual('man bâzi mikonam');
      expect(conjugatePresent('bâzi kon', '2s')).toEqual('to bâzi mikoni');
      expect(conjugatePresent('bâzi kon', '3s')).toEqual('u bâzi mikonad');
      expect(conjugatePresent('bâzi kon', '1p')).toEqual('mâ bâzi mikonim');
      expect(conjugatePresent('bâzi kon', '2p')).toEqual('shomâ bâzi mikonid');
      expect(conjugatePresent('bâzi kon', '3p')).toEqual('ânhâ bâzi mikonand');
    });

    it('should conjugate the regular dars dâdan', () => {
      expect(conjugatePresent('dars deh', '1s')).toEqual('man dars mideham');
      expect(conjugatePresent('dars deh', '2s')).toEqual('to dars midehi');
      expect(conjugatePresent('dars deh', '3s')).toEqual('u dars midehad');
      expect(conjugatePresent('dars deh', '1p')).toEqual('mâ dars midehim');
      expect(conjugatePresent('dars deh', '2p')).toEqual('shomâ dars midehid');
      expect(conjugatePresent('dars deh', '3p')).toEqual('ânhâ dars midehand');
    });

    it('should conjugate the y-extension jush âmadan', () => {
      expect(conjugatePresent('jush â', '1s')).toEqual('man jush miâyam');
      expect(conjugatePresent('jush â', '2s')).toEqual('to jush miâyi');
      expect(conjugatePresent('jush â', '3s')).toEqual('u jush miâyad');
      expect(conjugatePresent('jush â', '1p')).toEqual('mâ jush miâyim');
      expect(conjugatePresent('jush â', '2p')).toEqual('shomâ jush miâyid');
      expect(conjugatePresent('jush â', '3p')).toEqual('ânhâ jush miâyand');
    });
  });

  describe('present conjugation of verbs in simple present and with manual overrides', () => {
    it('should conjugate dâshtan', () => {
      const verb: VerbFa = {
        infinitive: 'dâshtan',
        presentForm: 'simple',
        presentStem: 'dâr'
      };

      expect(conjugatePresent(verb, '1s')).toEqual('man dâram');
      expect(conjugatePresent(verb, '2s')).toEqual('to dâri');
      expect(conjugatePresent(verb, '3s')).toEqual('u dârad');
      expect(conjugatePresent(verb, '1p')).toEqual('mâ dârim');
      expect(conjugatePresent(verb, '2p')).toEqual('shomâ dârid');
      expect(conjugatePresent(verb, '3p')).toEqual('ânhâ dârand');
    });

    it('should conjugate the combined meyl dâshtan', () => {
      const verb: VerbFa = {
        infinitive: 'meyl dâshtan',
        presentForm: 'simple',
        presentStem: 'meyl dâr'
      };

      expect(conjugatePresent(verb, '1s')).toEqual('man meyl dâram');
      expect(conjugatePresent(verb, '2s')).toEqual('to meyl dâri');
      expect(conjugatePresent(verb, '3s')).toEqual('u meyl dârad');
      expect(conjugatePresent(verb, '1p')).toEqual('mâ meyl dârim');
      expect(conjugatePresent(verb, '2p')).toEqual('shomâ meyl dârid');
      expect(conjugatePresent(verb, '3p')).toEqual('ânhâ meyl dârand');
    });

    it('should conjugate the irregular budan', () => {
      const verb: VerbFa = {
        infinitive: 'budan',
        presentStem: 'bâsh',
        present: {
          '1s': 'hastam',
          '2s': 'hasti',
          '3s': 'ast',
          '1p': 'hastim',
          '2p': 'hastid',
          '3p': 'hastand'
        }
      };

      expect(conjugatePresent(verb, '1s')).toEqual('man hastam');
      expect(conjugatePresent(verb, '2s')).toEqual('to hasti');
      expect(conjugatePresent(verb, '3s')).toEqual('u ast');
      expect(conjugatePresent(verb, '1p')).toEqual('mâ hastim');
      expect(conjugatePresent(verb, '2p')).toEqual('shomâ hastid');
      expect(conjugatePresent(verb, '3p')).toEqual('ânhâ hastand');
    });
  });

  const conjugatePresent = (presentStemOrVerb: string | VerbFa, person: Person): string => {
    const verb = typeof presentStemOrVerb === 'string'
      ? { infinitive: 'infinitive', presentStem: presentStemOrVerb }
      : presentStemOrVerb;
    return conjugateFaRm(verb, { person, tense: 'present' });
  };
});
