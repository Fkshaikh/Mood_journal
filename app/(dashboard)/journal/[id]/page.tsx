import Editor from '@/components/Editor'
import { getUserIdByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id) => {
  const user = await getUserIdByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  })
  return entry
}
const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  const analysisData = [
    { name: 'Summary', value: '' },
    { name: 'Subject', value: '' },
    { name: 'Mood', value: '' },
    { name: 'Negative', value: false },
  ]
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((items) => (
              <li
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
                key={items.name}
              >
                <span className="text-lg font-semibold">{items.name}</span>
                <span>{items.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default EntryPage
