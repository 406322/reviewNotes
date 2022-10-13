import { Table } from "../components/table"
import { Filter } from "../components/filter"

const ReviewNotes = () => {
    return (
        <>
            <h1 className="mb-5 text-3xl font-bold underline">Review notes</h1>
            <Filter />
            <Table />
        </>
    )
}

export default ReviewNotes