'use client';

import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';
import ItemCard from './ItemCard';
import { usePublicItems } from '../hooks/usePublicItems';

export default function HomeClient() {
    const { data, isLoading, isError, error } = usePublicItems();

    return (
        <div>
            <Header />
            <main className="container mx-auto px-4">
                <Hero />

                <section className="py-8">
                    <h2 className="text-2xl font-bold mb-4">موارد عمومی</h2>

                    {isLoading && <div>در حال بارگذاری...</div>}
                    {isError && <div className="text-red-600">خطا: {error?.message}</div>}

                    {!isLoading && data?.length === 0 && <div>موردی یافت نشد.</div>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}