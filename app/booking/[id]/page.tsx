import { BookingStart } from "@/components/BookingStart";

export default function BookingStartPage({ params }: { params: { id: string } }) {
  return <BookingStart tourId={params.id} />;
}
