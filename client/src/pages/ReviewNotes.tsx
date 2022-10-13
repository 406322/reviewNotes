import { Header } from "../components/header/header"
import { Filter } from "../components/filter/filter"
import { Table } from "../components/table/table"


const ReviewNotes = () => {
    return (
        <div className="min-w-[1400px]">
            <Header />
            <Filter />
            <Table />
        </div>
    )
}

export default ReviewNotes