export function calcMinimize(target, actual) {
  if (actual <= 0) return 100; 
  if (target <= 0) return 0;   
  const score = (target / actual) * 100;
  return Math.min(score, 100);
}

export function calcMaximize(target, actual) {
  if (target <= 0) return 100; 
  const score = (actual / target) * 100;
  return Math.min(score, 100);
}

export function calcTimeline(deadline, submittedDate) {
  const deadlineDate = new Date(deadline);
  const submitted = new Date(submittedDate);
  
  if (submitted <= deadlineDate) {
    return 100;
  }
  return 0;
}

export function calcZeroIncident(actual) {
  return actual === 0 ? 100 : 0;
}

export function calcScore(uomType, target, actual, deadline, submittedDate) {
  switch (uomType) {
    case 'Minimize':
      return calcMinimize(target, actual);
    case 'Maximize':
      return calcMaximize(target, actual);
    case 'Timeline':
      return calcTimeline(deadline, submittedDate);
    case 'Zero Incident':
      return calcZeroIncident(actual);
    default:
      return 0; 
  }
}
