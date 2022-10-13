import { Table } from "../components/table"
import { Filter } from "../components/filter"

const ReviewNotes = () => {
    return (
        <div className="min-w-[1400px]">
            <h1 className="mb-5 text-3xl font-bold underline">Review notes</h1>
            <Filter />
            <Table />
        </div>
    )
}

export default ReviewNotes