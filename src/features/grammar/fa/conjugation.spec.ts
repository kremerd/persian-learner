import { VerbFa } from '../fa/model/verb';
import { Person } from '../model/verbForm';
import { conjugateFa } from './conjugation';

describe('Farsi conjugation', () => {
  describe('infinitives', () => {
    it('should build the infinitive of a simple verb', () => {
      expect(conjugateFa({ infinitive: 'گُفتَن', presentStem: 'گو' }, 'infinitive')).toEqual('گُفتَن');
    });
  });

  describe('present conjugation of simple verbs', () => {
    it('should conjugate the regular رَفتَن', () => {
      expect(conjugatePresent('رَو', '1s')).toEqual('مَن می‌رَوَم');
      expect(conjugatePresent('رَو', '2s')).toEqual('تو می‌رَوی');
      expect(conjugatePresent('رَو', '3s')).toEqual('او می‌رَوَد');
      expect(conjugatePresent('رَو', '1p')).toEqual('ما می‌رَویم');
      expect(conjugatePresent('رَو', '2p')).toEqual('شُما می‌رَوید');
      expect(conjugatePresent('رَو', '3p')).toEqual('آنها می‌رَوَند');
    });

    it('should conjugate the regular دیدَن', () => {
      expect(conjugatePresent('بین', '1s')).toEqual('مَن می‌بینَم');
      expect(conjugatePresent('بین', '2s')).toEqual('تو می‌بینی');
      expect(conjugatePresent('بین', '3s')).toEqual('او می‌بینَد');
      expect(conjugatePresent('بین', '1p')).toEqual('ما می‌بینیم');
      expect(conjugatePresent('بین', '2p')).toEqual('شُما می‌بینید');
      expect(conjugatePresent('بین', '3p')).toEqual('آنها می‌بینَند');
    });

    it('should conjugate the y-extension آمَدَن', () => {
      expect(conjugatePresent('آ', '1s')).toEqual('مَن می‌آیَم');
      expect(conjugatePresent('آ', '2s')).toEqual('تو می‌آیی');
      expect(conjugatePresent('آ', '3s')).toEqual('او می‌آیَد');
      expect(conjugatePresent('آ', '1p')).toEqual('ما می‌آییم');
      expect(conjugatePresent('آ', '2p')).toEqual('شُما می‌آیید');
      expect(conjugatePresent('آ', '3p')).toEqual('آنها می‌آیَند');
    });

    it('should conjugate the y-extension گُفتَن', () => {
      expect(conjugatePresent('گو', '1s')).toEqual('مَن می‌گویَم');
      expect(conjugatePresent('گو', '2s')).toEqual('تو می‌گویی');
      expect(conjugatePresent('گو', '3s')).toEqual('او می‌گویَد');
      expect(conjugatePresent('گو', '1p')).toEqual('ما می‌گوییم');
      expect(conjugatePresent('گو', '2p')).toEqual('شُما می‌گویید');
      expect(conjugatePresent('گو', '3p')).toEqual('آنها می‌گویَند');
    });
  });

  describe('present conjugation of combined verbs', () => {
    it('should conjugate the regular بازی کَردَن', () => {

      expect(conjugatePresent('بازی کُن', '1s')).toEqual('مَن بازی می‌کُنَم');
      expect(conjugatePresent('بازی کُن', '2s')).toEqual('تو بازی می‌کُنی');
      expect(conjugatePresent('بازی کُن', '3s')).toEqual('او بازی می‌کُنَد');
      expect(conjugatePresent('بازی کُن', '1p')).toEqual('ما بازی می‌کُنیم');
      expect(conjugatePresent('بازی کُن', '2p')).toEqual('شُما بازی می‌کُنید');
      expect(conjugatePresent('بازی کُن', '3p')).toEqual('آنها بازی می‌کُنَند');
    });

    it('should conjugate the regular دَرس دادَن', () => {
      expect(conjugatePresent('دَرس دِه', '1s')).toEqual('مَن دَرس می‌دِهَم');
      expect(conjugatePresent('دَرس دِه', '2s')).toEqual('تو دَرس می‌دِهی');
      expect(conjugatePresent('دَرس دِه', '3s')).toEqual('او دَرس می‌دِهَد');
      expect(conjugatePresent('دَرس دِه', '1p')).toEqual('ما دَرس می‌دِهیم');
      expect(conjugatePresent('دَرس دِه', '2p')).toEqual('شُما دَرس می‌دِهید');
      expect(conjugatePresent('دَرس دِه', '3p')).toEqual('آنها دَرس می‌دِهَند');
    });

    it('should conjugate the y-extension جوش آمَدَن', () => {
      expect(conjugatePresent('جوش آ', '1s')).toEqual('مَن جوش می‌آیَم');
      expect(conjugatePresent('جوش آ', '2s')).toEqual('تو جوش می‌آیی');
      expect(conjugatePresent('جوش آ', '3s')).toEqual('او جوش می‌آیَد');
      expect(conjugatePresent('جوش آ', '1p')).toEqual('ما جوش می‌آییم');
      expect(conjugatePresent('جوش آ', '2p')).toEqual('شُما جوش می‌آیید');
      expect(conjugatePresent('جوش آ', '3p')).toEqual('آنها جوش می‌آیَند');
    });
  });

  describe('present conjugation of verbs in simple present and with manual overrides', () => {
    it('should conjugate داشتَن', () => {
      const verb: VerbFa = {
        infinitive: 'داشتَن',
        presentForm: 'simple',
        presentStem: 'دار'
      };

      expect(conjugatePresent(verb, '1s')).toEqual('مَن دارَم');
      expect(conjugatePresent(verb, '2s')).toEqual('تو داری');
      expect(conjugatePresent(verb, '3s')).toEqual('او دارَد');
      expect(conjugatePresent(verb, '1p')).toEqual('ما داریم');
      expect(conjugatePresent(verb, '2p')).toEqual('شُما دارید');
      expect(conjugatePresent(verb, '3p')).toEqual('آنها دارَند');
    });

    it('should conjugate the combined مِیل داشتَن', () => {
      const verb: VerbFa = {
        infinitive: ' مِیل داشتَن',
        presentForm: 'simple',
        presentStem: 'مِیل دار'
      };

      expect(conjugatePresent(verb, '1s')).toEqual('مَن مِیل دارَم');
      expect(conjugatePresent(verb, '2s')).toEqual('تو مِیل داری');
      expect(conjugatePresent(verb, '3s')).toEqual('او مِیل دارَد');
      expect(conjugatePresent(verb, '1p')).toEqual('ما مِیل داریم');
      expect(conjugatePresent(verb, '2p')).toEqual('شُما مِیل دارید');
      expect(conjugatePresent(verb, '3p')).toEqual('آنها مِیل دارَند');
    });

    it('should conjugate the irregular بودَن', () => {
      const verb: VerbFa = {
        infinitive: 'بودَن',
        presentStem: 'باش',
        present: {
          '1s': 'هَستَم',
          '2s': 'هَستی',
          '3s': 'اَست',
          '1p': 'هَستیم',
          '2p': 'هَستید',
          '3p': 'هَستَند'
        }
      };

      expect(conjugatePresent(verb, '1s')).toEqual('مَن هَستَم');
      expect(conjugatePresent(verb, '2s')).toEqual('تو هَستی');
      expect(conjugatePresent(verb, '3s')).toEqual('او اَست');
      expect(conjugatePresent(verb, '1p')).toEqual('ما هَستیم');
      expect(conjugatePresent(verb, '2p')).toEqual('شُما هَستید');
      expect(conjugatePresent(verb, '3p')).toEqual('آنها هَستَند');
    });
  });

  const conjugatePresent = (presentStemOrVerb: string | VerbFa, person: Person): string => {
    const verb = typeof presentStemOrVerb === 'string'
      ? { infinitive: 'infinitive', presentStem: presentStemOrVerb }
      : presentStemOrVerb;
    return conjugateFa(verb, { person, tense: 'present' });
  };
});
