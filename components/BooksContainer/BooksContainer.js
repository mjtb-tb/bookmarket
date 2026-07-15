import styles from './BooksContainer.module.css';
import BookBox from '../BookBox/BookBox';
import { useEffect, useState } from "react";

export default function BooksContainer({ data = [], error, message, title }) {
    const [wishlist, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    function removeFavoriteFromWishlist(id){
        let filtered = wishlist.filter((book)=>{
            return book._id != id
        })

        setWishlist(filtered)
    }
    
    function addFavoriteToWishlist(array){
        setWishlist(array)
    }

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                let response = await fetch("/api/getFavorites");
                let resivedata = await response.json();
                
                if (!error && resivedata?.data?.wishlist) {
                    setWishlist(resivedata.data.wishlist);                
                } else {
                    setWishlist([]);
                }
            } catch (err) {
                console.error("خطا در فچ کردن علاقه‌مندی‌ها:", err);
                setWishlist([]);
            }
        };
        fetchFavorites();
    }, [error, data]);

    function handleIsFavorite(book) {
        if (!wishlist || wishlist?.length === 0) return false;
        return wishlist.some((f) => f?._id === book?._id);
    }
    
    // منطق تقسیم داده‌ها
    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    const currentBooks = data.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // 🟢 تابع جادویی هوشمند‌سازی شماره صفحات (جلوگیری از نمایش ۱۰۰ صفحه)
    const getPageNumbers = () => {
        const pages = [];
        const range = 1; // تعداد صفحات قبل و بعد از صفحه فعلی که مایلید دیده شوند

        for (let i = 1; i <= totalPages; i++) {
            // همیشه صفحه اول و آخر را نگه دار، یا صفحاتی که در محدوده (range) صفحه فعلی هستند
            if (i === 1 || i === totalPages || (i >= currentPage - range && i <= currentPage + range)) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                // اگر فاصله افتاد و هنوز سه‌نقطه نگذاشته‌ایم، سه‌نقطه اضافه کن
                pages.push('...');
            }
        }
        return pages;
    };

    return (
        <div className={styles.BooksContainer}>
            <div className={styles.BooksContainer_content}>
                <div className={styles.BooksContainer_title}>
                    <div className={styles.BooksContainer_title_text}>{title}</div>
                </div>
                
                <div className={styles.BooksContainer_books}>
                    {currentBooks && currentBooks.length > 0 ? (
                        currentBooks.map((book) => (
                            <BookBox 
                                key={book._id} 
                                id={book._id}
                                bookname={book.bookname} 
                                author={book.author} 
                                category={book.category}  
                                favorite={handleIsFavorite(book)} 
                                coverImg={book.coverImg}
                                onRemove={removeFavoriteFromWishlist}
                                onAdd={addFavoriteToWishlist}
                            />
                        ))
                    ) : (
                        <p style={{color:'wheat'}}>کتابی برای نمایش وجود ندارد</p>
                    )}
                </div>

                {/* بخش دکمه‌های هوشمند صفحه‌بندی */}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button 
                            onClick={() => paginate(currentPage - 1)} 
                            disabled={currentPage === 1}
                            className={styles.pageBtn}
                        >
                            قبلی
                        </button>

                        {/* 🟢 رندر کردن شماره‌ها بر اساس تابع هوشمند جدید */}
                        {getPageNumbers().map((page, index) => {
                            if (page === '...') {
                                return (
                                    <span key={`dots-${index}`} className={styles.dots}>
                                        ...
                                    </span>
                                );
                            }
                            return (
                                <button
                                    key={page}
                                    onClick={() => paginate(page)}
                                    className={`${styles.pageNumber} ${currentPage === page ? styles.activePage : ''}`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button 
                            onClick={() => paginate(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                            className={styles.pageBtn}
                        >
                            بعدی
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}