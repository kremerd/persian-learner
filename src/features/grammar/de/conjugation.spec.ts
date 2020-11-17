import { conjugate } from './conjugation';

describe('German conjugation', () => {
  describe('regular verbs', () => {
    it('should conjugate fragen', () => {
      expect(conjugate('fragen', 'present', '1s')).toEqual('ich frage');
      expect(conjugate('fragen', 'present', '2s')).toEqual('du fragst');
      expect(conjugate('fragen', 'present', '3s')).toEqual('er / sie fragt');
      expect(conjugate('fragen', 'present', '1p')).toEqual('wir fragen');
      expect(conjugate('fragen', 'present', '2p')).toEqual('ihr fragt');
      expect(conjugate('fragen', 'present', '3p')).toEqual('sie fragen');
    });

    it('should conjugate warten', () => {
      expect(conjugate('warten', 'present', '1s')).toEqual('ich warte');
      expect(conjugate('warten', 'present', '2s')).toEqual('du wartest');
      expect(conjugate('warten', 'present', '3s')).toEqual('er / sie wartet');
      expect(conjugate('warten', 'present', '1p')).toEqual('wir warten');
      expect(conjugate('warten', 'present', '2p')).toEqual('ihr wartet');
      expect(conjugate('warten', 'present', '3p')).toEqual('sie warten');
    });

    it('should conjugate reden', () => {
      expect(conjugate('reden', 'present', '1s')).toEqual('ich rede');
      expect(conjugate('reden', 'present', '2s')).toEqual('du redest');
      expect(conjugate('reden', 'present', '3s')).toEqual('er / sie redet');
      expect(conjugate('reden', 'present', '1p')).toEqual('wir reden');
      expect(conjugate('reden', 'present', '2p')).toEqual('ihr redet');
      expect(conjugate('reden', 'present', '3p')).toEqual('sie reden');
    });

    it('should conjugate reisen', () => {
      expect(conjugate('reisen', 'present', '1s')).toEqual('ich reise');
      expect(conjugate('reisen', 'present', '2s')).toEqual('du reist');
      expect(conjugate('reisen', 'present', '3s')).toEqual('er / sie reist');
      expect(conjugate('reisen', 'present', '1p')).toEqual('wir reisen');
      expect(conjugate('reisen', 'present', '2p')).toEqual('ihr reist');
      expect(conjugate('reisen', 'present', '3p')).toEqual('sie reisen');
    });

    it('should conjugate tanzen', () => {
      expect(conjugate('tanzen', 'present', '1s')).toEqual('ich tanze');
      expect(conjugate('tanzen', 'present', '2s')).toEqual('du tanzt');
      expect(conjugate('tanzen', 'present', '3s')).toEqual('er / sie tanzt');
      expect(conjugate('tanzen', 'present', '1p')).toEqual('wir tanzen');
      expect(conjugate('tanzen', 'present', '2p')).toEqual('ihr tanzt');
      expect(conjugate('tanzen', 'present', '3p')).toEqual('sie tanzen');
    });

    it('should conjugate atmen', () => {
      expect(conjugate('atmen', 'present', '1s')).toEqual('ich atme');
      expect(conjugate('atmen', 'present', '2s')).toEqual('du atmest');
      expect(conjugate('atmen', 'present', '3s')).toEqual('er / sie atmet');
      expect(conjugate('atmen', 'present', '1p')).toEqual('wir atmen');
      expect(conjugate('atmen', 'present', '2p')).toEqual('ihr atmet');
      expect(conjugate('atmen', 'present', '3p')).toEqual('sie atmen');
    });

    it('should conjugate öffnen', () => {
      expect(conjugate('öffnen', 'present', '1s')).toEqual('ich öffne');
      expect(conjugate('öffnen', 'present', '2s')).toEqual('du öffnest');
      expect(conjugate('öffnen', 'present', '3s')).toEqual('er / sie öffnet');
      expect(conjugate('öffnen', 'present', '1p')).toEqual('wir öffnen');
      expect(conjugate('öffnen', 'present', '2p')).toEqual('ihr öffnet');
      expect(conjugate('öffnen', 'present', '3p')).toEqual('sie öffnen');
    });

    it('should conjugate kommen', () => {
      expect(conjugate('kommen', 'present', '1s')).toEqual('ich komme');
      expect(conjugate('kommen', 'present', '2s')).toEqual('du kommst');
      expect(conjugate('kommen', 'present', '3s')).toEqual('er / sie kommt');
      expect(conjugate('kommen', 'present', '1p')).toEqual('wir kommen');
      expect(conjugate('kommen', 'present', '2p')).toEqual('ihr kommt');
      expect(conjugate('kommen', 'present', '3p')).toEqual('sie kommen');
    });

    it('should conjugate lernen', () => {
      expect(conjugate('lernen', 'present', '1s')).toEqual('ich lerne');
      expect(conjugate('lernen', 'present', '2s')).toEqual('du lernst');
      expect(conjugate('lernen', 'present', '3s')).toEqual('er / sie lernt');
      expect(conjugate('lernen', 'present', '1p')).toEqual('wir lernen');
      expect(conjugate('lernen', 'present', '2p')).toEqual('ihr lernt');
      expect(conjugate('lernen', 'present', '3p')).toEqual('sie lernen');
    });

    it('should conjugate qualmen', () => {
      expect(conjugate('qualmen', 'present', '1s')).toEqual('ich qualme');
      expect(conjugate('qualmen', 'present', '2s')).toEqual('du qualmst');
      expect(conjugate('qualmen', 'present', '3s')).toEqual('er / sie qualmt');
      expect(conjugate('qualmen', 'present', '1p')).toEqual('wir qualmen');
      expect(conjugate('qualmen', 'present', '2p')).toEqual('ihr qualmt');
      expect(conjugate('qualmen', 'present', '3p')).toEqual('sie qualmen');
    });

    it('should conjugate sammeln', () => {
      expect(conjugate('sammeln', 'present', '1s')).toEqual('ich sammle');
      expect(conjugate('sammeln', 'present', '2s')).toEqual('du sammelst');
      expect(conjugate('sammeln', 'present', '3s')).toEqual('er / sie sammelt');
      expect(conjugate('sammeln', 'present', '1p')).toEqual('wir sammeln');
      expect(conjugate('sammeln', 'present', '2p')).toEqual('ihr sammelt');
      expect(conjugate('sammeln', 'present', '3p')).toEqual('sie sammeln');
    });
  });
});
