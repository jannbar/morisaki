type Props = {
  book: {
    title: string
    author: string
  }
  bgColor?: string
}

const COLORS = {
  red: '#450a0a',
  green: '#052e16',
  blue: '#172554',
  gray: '#030712',
} as const

function getRandomColor() {
  const keys = Object.keys(COLORS)
  const color = keys[
    Math.floor(Math.random() * keys.length)
  ] as keyof typeof COLORS

  return COLORS[color]
}

export default function BookCover({ book, bgColor }: Props) {
  const color = bgColor ?? getRandomColor()

  return (
    <div
      className={`flex aspect-[1/1.5] flex-col gap-4 p-6 text-white`}
      style={{ backgroundColor: color }}
    >
      <span className="text-xs">{book.author}</span>
      <div className="h-[1px] w-10 bg-white"></div>
      <span className="font-serif italic">{book.title}</span>
    </div>
  )
}
