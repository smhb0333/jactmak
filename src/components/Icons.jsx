const S = { fill:"none", stroke:"currentColor", strokeWidth:1.6, strokeLinecap:"round", strokeLinejoin:"round" };
export const Search = (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...S} {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.7-3.7"/></svg>;
export const Heart  = ({filled,...p}) => <svg viewBox="0 0 24 24" width="18" height="18" {...S} fill={filled?"currentColor":"none"} {...p}><path d="M12 20.4S3.6 15 3.6 9.3A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8.4 2.7c0 5.7-8.4 11.1-8.4 11.1Z"/></svg>;
export const Bag    = (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...S} {...p}><path d="M4.6 7.5h14.8L18.4 20.5H5.6L4.6 7.5Z"/><path d="M9 7.5V6a3 3 0 0 1 6 0v1.5"/></svg>;
export const Menu   = (p) => <svg viewBox="0 0 24 24" width="18" height="18" {...S} {...p}><path d="M3.5 7h17M3.5 12h17M3.5 17h17"/></svg>;
export const X      = (p) => <svg viewBox="0 0 24 24" width="14" height="14" {...S} strokeWidth="1.9" {...p}><path d="M5 5l14 14M19 5 5 19"/></svg>;
export const Arrow  = (p) => <svg viewBox="0 0 24 24" width="14" height="14" {...S} strokeWidth="2" {...p}><path d="M5 12h13m-5.5-6 6 6-6 6"/></svg>;
export const Plus   = (p) => <svg viewBox="0 0 24 24" width="11" height="11" {...S} strokeWidth="2.4" {...p}><path d="M12 5v14M5 12h14"/></svg>;
export const Check  = (p) => <svg viewBox="0 0 24 24" width="14" height="14" {...S} strokeWidth="2.4" {...p}><path d="m4 12.5 5 5 11-11"/></svg>;
export const Lock   = (p) => <svg viewBox="0 0 24 24" width="13" height="13" {...S} {...p}><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7"/></svg>;
export const Chevron= (p) => <svg viewBox="0 0 24 24" width="14" height="14" {...S} strokeWidth="2" {...p}><path d="m6 9.5 6 6 6-6"/></svg>;
export const Star   = ({filled,...p}) => <svg viewBox="0 0 24 24" width="11" height="11" {...S} strokeWidth="1.7" fill={filled?"currentColor":"none"} {...p}><path d="m12 3.6 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 10l6-.8z"/></svg>;
export const Truck  = (p) => <svg viewBox="0 0 24 24" width="14" height="14" {...S} {...p}><path d="M2.5 7h10v9h-10zM12.5 10.5h4l3 3v2.5h-7z"/><circle cx="6" cy="18" r="1.7"/><circle cx="16.5" cy="18" r="1.7"/></svg>;
export const Stars  = ({ r = 5 }) => (
  <span className="stars" aria-hidden="true">{[1,2,3,4,5].map(i => <Star key={i} filled={i <= Math.round(r)} />)}</span>
);
