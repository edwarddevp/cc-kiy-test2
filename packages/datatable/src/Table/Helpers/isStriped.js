export const isStriped = (striped, index) => {
  if (striped) {
    return (index % 2) ? '#ffffff':'#F7FAFC'
  } else {
    return '#ffffff'
  }
}