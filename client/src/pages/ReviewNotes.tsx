import { Table } from "../components/table"
import { Filter } from "../components/filter"

const ReviewNotes = () => {
    return (
        <div className="min-w-[1400px]">

            <div className="flex gap-1 m-3">
                <p className="text-sm text-blue-400 underline">Engagements</p>
                <p className="text-sm">&gt;</p>
                <p className="text-sm text-blue-400 underline">Microsoft 2021</p>
                <p className="text-sm">&gt;</p>
                <p className="text-sm">Review notes</p>
            </div>

            <div
                className="flex gap-8 border-b-2 border-black">
                <h1 className="p-5 text-3xl font-bold">Review notes</h1>
                <div className="flex flex-col justify-center">
                    <button
                        className="w-16 border-2 border-black"
                        onClick={() => alert('Here will be the form to create a new review note')}>
                        New
                    </button>
                </div>
            </div>

            <Filter />
            <Table />
        </div>
    )
}

export default ReviewNotes