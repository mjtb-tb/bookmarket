import Link from "next/link"
import Image from "next/image"
import styles from './Header.module.css'

export default function Header(){
    return(
        <>
            <header className={styles.header}>
                <div className={styles.header_content}>
                    <div className={styles.header_logo}>
                        <Link href='/home'>
                            <Image src='/logo/logo.png' fill ></Image>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}