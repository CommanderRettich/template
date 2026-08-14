'use client';

import { useEffect } from 'react';

/**
 * Nimmt einem fokussierten input[type=number] den Fokus, sobald das Mausrad
 * darüber bewegt wird. Ohne das zählt der Browser den Wert hoch oder runter,
 * beim Trackpad schon durch bloßes Weiterscrollen nach der Eingabe.
 *
 * blur() statt preventDefault(): preventDefault würde die ganze Seite anhalten,
 * solange der Zeiger über dem Feld steht. Ein Zuhörer am Dokument in der
 * Abfangphase gilt auch für Felder, die es heute noch nicht gibt.
 *
 * Muster: knowledge/patterns/forms.md, Abschnitt "Zahlenfelder".
 */
export function KeinRadAufZahlen() {
  useEffect(() => {
    function beimRad(ereignis: WheelEvent) {
      const ziel = ereignis.target;
      if (!(ziel instanceof HTMLInputElement)) return;
      if (ziel.type !== 'number') return;
      if (document.activeElement !== ziel) return;
      ziel.blur();
    }

    document.addEventListener('wheel', beimRad, { capture: true });
    return () => document.removeEventListener('wheel', beimRad, { capture: true });
  }, []);

  return null;
}
