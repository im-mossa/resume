import { Item } from '../types/index.js';

export default function ItemCard({ item }: { item: Item }) {
    return (
        <article className="border rounded-lg p-4 shadow-sm">
            {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-md mb-3" />
            )}
            <h3 className="font-semibold">{item.title}</h3>
            {item.description && <p className="text-sm text-muted-foreground mt-2">{item.description}</p>}
        </article>
    );
}