export default function Footer() {
    return (
        <footer className="border-t py-6 mt-12">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Resume Project. All rights reserved.
            </div>
        </footer>
    );
}