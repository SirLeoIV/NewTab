import { Component, OnInit } from '@angular/core';

type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs';
type Source = 'waste' | 'tableau' | 'foundation';

interface Card {
  suit: Suit;
  rank: number; // 1 = ace ... 11 = jack, 12 = queen, 13 = king
  faceUp: boolean;
}

interface Selection {
  source: Source;
  pile: number;  // tableau column / foundation index (0 for waste)
  index: number; // position inside the pile
}

const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANK_NAMES = ['', 'ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

// Folder that contains e.g. "2_of_spades.svg" / "queen_of_hearts.svg".
// Angular <=17: src/assets/...  ->  'assets/cards/'
// Angular 18+ (public/ folder): public/cards/ -> 'cards/'
const CARD_PATH = 'assets/cards/';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true
})
export class CardsComponent implements OnInit {
  stock: Card[] = [];
  waste: Card[] = [];
  foundations: Card[][] = [[], [], [], []];
  tableau: Card[][] = [[], [], [], [], [], [], []];

  best: number | null = null;
  newBest = false;
  private readonly BEST_KEY = 'solitaire-best-moves';

  selected: Selection | null = null;
  moves = 0;

  ngOnInit(): void {
    this.newGame();
    try {
      const saved = localStorage.getItem(this.BEST_KEY);
      this.best = saved ? +saved : null;
    } catch { /* storage unavailable */ }
  }

  // ---------- setup ----------

  newGame(): void {
    const deck: Card[] = [];
    for (const suit of SUITS) {
      for (let rank = 1; rank <= 13; rank++) {
        deck.push({ suit, rank, faceUp: false });
      }
    }
    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    this.tableau = [[], [], [], [], [], [], []];
    for (let col = 0; col < 7; col++) {
      for (let n = 0; n <= col; n++) {
        const card = deck.pop()!;
        card.faceUp = n === col;
        this.tableau[col].push(card);
      }
    }
    this.stock = deck;
    this.waste = [];
    this.foundations = [[], [], [], []];
    this.selected = null;
    this.moves = 0;
    this.newBest = false;
  }

  // ---------- helpers for the template ----------

  isRed(card: Card): boolean {
    return card.suit === 'hearts' || card.suit === 'diamonds';
  }

  label(card: Card): string {
    return ({ 1: 'A', 11: 'J', 12: 'Q', 13: 'K' } as Record<number, string>)[card.rank] ?? String(card.rank);
  }

  symbol(card: Card): string {
    return { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' }[card.suit];
  }

  get won(): boolean {
    return this.foundations.every(f => f.length === 13);
  }

  /** Overlap between cards in a column (percent of the card width, card height = 140%). */
  // natural spacing units: a face-up card shows 40, a face-down one 17
  step(col: number, idx: number): number {
    return this.tableau[col][idx].faceUp ? 40 : 17;
  }

  pos(col: number, idx: number): number {
    let sum = 0;
    for (let i = 0; i < idx; i++) sum += this.step(col, i);
    return sum;
  }

  total(col: number): number {
    const n = this.tableau[col].length;
    return Math.max(1, n ? this.pos(col, n - 1) : 1);
  }

  isSelected(source: Source, pile: number, index: number): boolean {
    const s = this.selected;
    if (!s || s.source !== source || s.pile !== pile) return false;
    // for tableau: the selected card and everything on top of it
    return source === 'tableau' ? index >= s.index : index === s.index;
  }

  // ---------- click handlers ----------

  onStock(): void {
    this.selected = null;
    if (this.stock.length) {
      const card = this.stock.pop()!;
      card.faceUp = true;
      this.waste.push(card);
    } else if (this.waste.length) {
      // recycle waste back into the stock
      this.stock = this.waste.reverse().map(c => ({ ...c, faceUp: false }));
      this.waste = [];
    }
    this.moves++;
  }

  onWaste(event: Event): void {
    event.stopPropagation();
    if (!this.waste.length) return;
    this.toggleSelect({ source: 'waste', pile: 0, index: this.waste.length - 1 });
  }

  onFoundation(i: number): void {
    if (this.selected) {
      if (!this.moveToFoundation(i)) this.selected = null;
      return;
    }
    const pile = this.foundations[i];
    if (pile.length) {
      this.toggleSelect({ source: 'foundation', pile: i, index: pile.length - 1 });
    }
  }

  onTableauCard(col: number, idx: number, event: Event): void {
    event.stopPropagation();
    const card = this.tableau[col][idx];
    if (!card.faceUp) return;
    if (this.selected && this.moveToTableau(col)) return;
    this.toggleSelect({ source: 'tableau', pile: col, index: idx });
  }

  /** Click on an empty column (or the free space below its cards). */
  onColumn(col: number): void {
    if (this.selected) this.moveToTableau(col);
  }

  /** Double click: send the card to a foundation automatically. */
  onAutoMove(source: Source, pile: number, event: Event): void {
    event.stopPropagation();
    let sel: Selection | null = null;
    if (source === 'waste' && this.waste.length) {
      sel = { source, pile: 0, index: this.waste.length - 1 };
    } else if (source === 'tableau') {
      const col = this.tableau[pile];
      if (col.length) sel = { source, pile, index: col.length - 1 };
    }
    if (!sel) return;
    this.selected = sel;
    for (let f = 0; f < 4; f++) {
      if (this.moveToFoundation(f)) return;
    }
    this.selected = null;
  }

  // ---------- rules & moves ----------

  private toggleSelect(sel: Selection): void {
    const s = this.selected;
    const same = s && s.source === sel.source && s.pile === sel.pile && s.index === sel.index;
    this.selected = same ? null : sel;
  }

  private selectedCards(): Card[] {
    const s = this.selected;
    if (!s) return [];
    switch (s.source) {
      case 'waste': return this.waste.slice(-1);
      case 'foundation': return this.foundations[s.pile].slice(-1);
      case 'tableau': return this.tableau[s.pile].slice(s.index);
    }
  }

  private removeSelected(): void {
    const s = this.selected!;
    if (s.source === 'waste') this.waste.pop();
    else if (s.source === 'foundation') this.foundations[s.pile].pop();
    else {
      const col = this.tableau[s.pile];
      col.splice(s.index);
      if (col.length) col[col.length - 1].faceUp = true; // reveal next card
    }
  }

  private canPlaceOnTableau(card: Card, col: number): boolean {
    const pile = this.tableau[col];
    if (!pile.length) return card.rank === 13;
    const top = pile[pile.length - 1];
    return top.faceUp && top.rank === card.rank + 1 && this.isRed(top) !== this.isRed(card);
  }

  private canPlaceOnFoundation(card: Card, f: number): boolean {
    const pile = this.foundations[f];
    if (!pile.length) return card.rank === 1 && !this.foundations.some(p => p[0]?.suit === card.suit);
    const top = pile[pile.length - 1];
    return top.suit === card.suit && top.rank === card.rank - 1;
  }

  private moveToTableau(col: number): boolean {
    const cards = this.selectedCards();
    const s = this.selected!;
    if (!cards.length || (s.source === 'tableau' && s.pile === col)) return false;
    if (!this.canPlaceOnTableau(cards[0], col)) return false;
    this.removeSelected();
    this.tableau[col].push(...cards);
    this.finishMove();
    return true;
  }

  private moveToFoundation(f: number): boolean {
    const cards = this.selectedCards();
    if (cards.length !== 1 || !this.canPlaceOnFoundation(cards[0], f)) return false;
    this.removeSelected();
    this.foundations[f].push(cards[0]);
    this.finishMove();
    return true;
  }

  private finishMove(): void {
    this.selected = null;
    this.moves++;
    if (this.won) this.onWin();
  }

  private onWin(): void {
    this.newBest = this.best === null || this.moves < this.best;
    if (this.newBest) {
      this.best = this.moves;
      try { localStorage.setItem(this.BEST_KEY, String(this.moves)); } catch { /* ignore */ }
    }
  }
}
