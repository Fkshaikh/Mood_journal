import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { getUserIdByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserIdByClerkId()
  const entries = prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="px-6 py-8 bg-zinc-100/50 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry}></EntryCard>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default JournalPage
