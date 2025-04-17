"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Edit,
  Trash2,
  Plus,
  Smartphone,
  ChevronRight,
  CheckCircle2,
  Calendar,
  User,
} from "lucide-react";
import { NewsModal } from "@/components/modals/NewsModal";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

interface NewsImage {
  url: string;
  alt: string;
  aspectRatio: "video" | "square" | "portrait";
}

interface NewsMetadata {
  author?: string;
  lastModified?: string;
  viewCount?: number;
}

interface News {
  id: string;
  title: string;
  content: string;
  summary?: string;
  date: string;
  status: "published" | "draft";
  type: "genel" | "sportlink";
  image?: NewsImage;
  metadata: NewsMetadata;
}

interface NewsInput {
  title: string;
  content: string;
  summary?: string;
  status: "published" | "draft";
  type: "genel" | "sportlink";
  image?: NewsImage;
  metadata?: Partial<NewsMetadata>;
}

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    news: News | null;
  }>({
    open: false,
    news: null,
  });
  const [confirmStatus, setConfirmStatus] = useState<{
    open: boolean;
    news: News | null;
    newStatus: "published" | "draft" | null;
  }>({
    open: false,
    news: null,
    newStatus: null,
  });

  const [news, setNews] = useState<News[]>([
    {
      id: "1",
      title: "Yeni Spor Salonu Açılıyor",
      content:
        "Yeni spor salonumuz 1 Nisan'da açılıyor. Modern ekipmanlar ve geniş antrenman alanlarıyla hizmetinizde olacak. Açılışa özel ilk ay ücretsiz deneme fırsatını kaçırmayın!",
      summary:
        "Modern ekipmanlar ve geniş antrenman alanlarıyla yeni spor salonumuz açılıyor.",
      date: "2024-03-10",
      status: "published",
      type: "genel",
      image: {
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
        alt: "Yeni Spor Salonu",
        aspectRatio: "video",
      },
      metadata: {
        author: "Admin",
        lastModified: "2024-03-10",
        viewCount: 156,
      },
    },
    {
      id: "2",
      title: "Yaz Kampı Kayıtları Başladı",
      content:
        "Yaz kampı kayıtları için son başvuru tarihi yaklaşıyor. 7-14 yaş arası çocuklar için özel programlar, profesyonel eğitmenler eşliğinde spor ve eğlence dolu bir yaz fırsatı!",
      summary: "7-14 yaş arası çocuklar için yaz kampı kayıtları başladı.",
      date: "2024-03-15",
      status: "draft",
      type: "sportlink",
      image: {
        url: "https://images.unsplash.com/photo-1472586662442-3eec04b9dbda?q=80&w=1200&auto=format&fit=crop",
        alt: "Yaz Kampı",
        aspectRatio: "video",
      },
      metadata: {
        author: "Spor Koordinatörü",
        lastModified: "2024-03-15",
        viewCount: 89,
      },
    },
    {
      id: "3",
      title: "Başarılı Sporcularımızı Tebrik Ediyoruz",
      content:
        "Geçen hafta sonu düzenlenen İstanbul Gençler Yüzme Şampiyonası'nda kulübümüz sporcuları 3 altın, 2 gümüş madalya kazandı. Tüm sporcularımızı ve antrenörlerimizi kutluyoruz!",
      summary: "İstanbul Gençler Yüzme Şampiyonası'nda 5 madalya kazandık.",
      date: "2024-03-20",
      status: "published",
      type: "genel",
      metadata: {
        author: "Yüzme Antrenörü",
        lastModified: "2024-03-20",
        viewCount: 245,
      },
    },
    {
      id: "4",
      title: "Fitness Challenge Başlıyor",
      content:
        "1 Nisan - 1 Mayıs tarihleri arasında düzenlenecek Fitness Challenge'a katılın, hedeflerinize ulaşın! Aylık üyelik kazanma şansı ve profesyonel beslenme danışmanlığı ödülleri sizi bekliyor.",
      summary: "Bir aylık fitness challenge ile hedeflerinize ulaşın.",
      date: "2024-03-22",
      status: "published",
      type: "sportlink",
      image: {
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
        alt: "Fitness Challenge",
        aspectRatio: "video",
      },
      metadata: {
        author: "Fitness Koordinatörü",
        lastModified: "2024-03-22",
        viewCount: 178,
      },
    },
    {
      id: "5",
      title: "Yeni Grup Dersleri Programı",
      content:
        "Nisan ayı grup dersleri programımız yayınlandı. Yoga, Pilates, Zumba ve yeni eklenen HIIT sınıflarımıza kayıtlar başladı. Yerinizi hemen ayırtın!",
      summary: "Nisan ayı grup dersleri programı yayınlandı.",
      date: "2024-03-25",
      status: "published",
      type: "genel",
      metadata: {
        author: "Grup Dersleri Koordinatörü",
        lastModified: "2024-03-25",
        viewCount: 134,
      },
    },
    {
      id: "6",
      title: "Beslenme Semineri",
      content:
        "Uzman diyetisyenimiz eşliğinde 'Sporcu Beslenmesi ve Performans' konulu seminerimiz 5 Nisan'da gerçekleşecek. Katılım ücretsizdir, rezervasyon gereklidir.",
      summary: "Sporcu beslenmesi ve performans semineri 5 Nisan'da.",
      date: "2024-03-27",
      status: "draft",
      type: "sportlink",
      image: {
        url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
        alt: "Beslenme Semineri",
        aspectRatio: "video",
      },
      metadata: {
        author: "Spor Diyetisyeni",
        lastModified: "2024-03-27",
        viewCount: 67,
      },
    },
    {
      id: "7",
      title: "Yüzme Kursları Yeni Dönem",
      content:
        "Yaz dönemi yüzme kurslarımız için kayıtlar başladı. Çocuk, yetişkin ve özel ders seçenekleriyle her seviyeye uygun programlar sunuyoruz.",
      summary: "Yaz dönemi yüzme kursları kayıtları başladı.",
      date: "2024-03-28",
      status: "published",
      type: "genel",
      image: {
        url: "https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=1200&auto=format&fit=crop",
        alt: "Yüzme Kursları",
        aspectRatio: "video",
      },
      metadata: {
        author: "Yüzme Koordinatörü",
        lastModified: "2024-03-28",
        viewCount: 198,
      },
    },
    {
      id: "8",
      title: "SportLink Turnuvası",
      content:
        "İlk SportLink Dostluk Turnuvası 15 Nisan'da başlıyor! Basketbol, voleybol ve futbol branşlarında kayıtlar devam ediyor. Takımınızı kurun, turnuvaya katılın!",
      summary:
        "Basketbol, voleybol ve futbol branşlarında SportLink Turnuvası başlıyor.",
      date: "2024-03-30",
      status: "published",
      type: "sportlink",
      image: {
        url: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=1200&auto=format&fit=crop",
        alt: "SportLink Turnuvası",
        aspectRatio: "video",
      },
      metadata: {
        author: "Turnuva Koordinatörü",
        lastModified: "2024-03-30",
        viewCount: 342,
      },
    },
    {
      id: "9",
      title: "Ramazan Ayı Özel Programı",
      content:
        "Ramazan ayına özel düzenlenen spor programlarımız ve iftardan sonra kullanılabilir esnek saat uygulaması hakkında detaylı bilgi için resepsiyona danışabilirsiniz.",
      summary: "Ramazan ayına özel spor programları ve esnek saatler.",
      date: "2024-04-01",
      status: "published",
      type: "genel",
      metadata: {
        author: "Tesis Müdürü",
        lastModified: "2024-04-01",
        viewCount: 167,
      },
    },
    {
      id: "10",
      title: "Yeni Antrenörlerimiz",
      content:
        "Profesyonel kadromuza katılan yeni antrenörlerimiz ile tanışın! Crossfit, Boxing ve Functional Training alanlarında uzman eğitmenlerimiz hizmetinizde.",
      summary:
        "Crossfit, Boxing ve Functional Training uzmanları aramıza katıldı.",
      date: "2024-04-02",
      status: "draft",
      type: "genel",
      image: {
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
        alt: "Yeni Antrenörler",
        aspectRatio: "video",
      },
      metadata: {
        author: "İnsan Kaynakları",
        lastModified: "2024-04-02",
        viewCount: 89,
      },
    },
  ]);

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditNews = (data: NewsInput) => {
    if (editingNews) {
      // Update existing news
      setNews(
        news.map((item) =>
          item.id === editingNews.id
            ? {
                ...item,
                ...data,
                metadata: {
                  ...item.metadata,
                  lastModified: new Date().toISOString(),
                  ...(data.metadata || {}),
                },
              }
            : item
        )
      );
      toast.success("Haber başarıyla güncellendi", {
        description: `"${data.title}" başlıklı haber güncellendi.`,
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        duration: 4000,
      });
    } else {
      // Add new news
      const newNews: News = {
        id: String(Date.now()),
        ...data,
        date: new Date().toISOString(),
        metadata: {
          author: "Admin", // Default author
          lastModified: new Date().toISOString(),
          viewCount: 0,
          ...(data.metadata || {}),
        },
      };
      setNews([...news, newNews]);
      toast.success("Yeni haber eklendi", {
        description: `"${data.title}" başlıklı haber oluşturuldu.`,
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        duration: 4000,
      });
    }
    setIsNewsModalOpen(false);
    setEditingNews(null);
  };

  const handleDeleteNews = (id: string) => {
    setNews(news.filter((item) => item.id !== id));
    toast.success("Haber başarıyla silindi");
  };

  const handleConfirmedDelete = (id: string) => {
    const newsToDelete = news.find((item) => item.id === id);
    setNews(news.filter((item) => item.id !== id));
    toast.success("Haber başarıyla silindi", {
      description: `"${newsToDelete?.title}" başlıklı haber silindi.`,
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
    setConfirmDelete({ open: false, news: null });
  };

  const handleConfirmedStatusChange = (
    id: string,
    newStatus: "published" | "draft"
  ) => {
    const targetNews = news.find((item) => item.id === id);
    setNews(
      news.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    toast.success("Haber durumu güncellendi", {
      description: `"${targetNews?.title}" başlıklı haber ${
        newStatus === "published" ? "yayınlandı" : "taslağa alındı"
      }.`,
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
    setConfirmStatus({ open: false, news: null, newStatus: null });
  };

  const handleNewsClick = (newsItem: News) => {
    setSelectedNews(newsItem);
    setIsContentModalOpen(true);
    setEditingNews(null);
    setIsNewsModalOpen(false);
  };

  const NewsCard = ({ news }: { news: News }) => (
    <div
      className={cn(
        "group border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden",
        news.type === "sportlink" &&
          "bg-blue-50/90 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
      )}
      onClick={() => handleNewsClick(news)}
    >
      <div className="flex items-start space-x-4 p-4">
        {news.image && (
          <div className="relative hidden sm:block flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <img
              src={news.image.url}
              alt={news.image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 text-base line-clamp-2 group-hover:text-primary transition-colors">
                {news.title}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                {new Date(news.date).toLocaleDateString("tr-TR")}
              </span>
            </div>
            {news.summary && (
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {news.summary}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant={news.status === "published" ? "default" : "secondary"}
                className={cn(
                  "px-1.5 py-0 text-xs",
                  news.status === "published"
                    ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-100 border border-green-200 dark:border-green-800"
                    : "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                )}
              >
                {news.status === "published" ? "Yayında" : "Taslak"}
              </Badge>
              {news.type === "sportlink" && (
                <Badge
                  variant="secondary"
                  className="px-1.5 py-0 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  SportLink
                </Badge>
              )}
            </div>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex w-full max-w-3xl items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Haberler
          </h2>
          <Button
            onClick={() => setIsNewsModalOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Haber Ekle
          </Button>
        </div>

        <div className="w-full max-w-3xl">
          <Input
            placeholder="Haberlerde ara..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        {filteredNews.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-sm text-muted-foreground">
                Haber bulunamadı.
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredNews.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "overflow-hidden hover:bg-accent/50 transition-colors",
                item.type === "sportlink" && "border-[#22c55e]"
              )}
            >
              <CardContent className="p-0">
                {item.image && (
                  <div className="relative h-48 w-full">
                    <img
                      src={item.image.url}
                      alt={item.image.alt}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                )}
                <div className="p-6 space-y-4">
                  {/* Header Section */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedNews(item);
                            setIsContentModalOpen(true);
                          }}
                          className="text-xl font-semibold hover:text-[#22c55e] focus:outline-none"
                        >
                          {item.title}
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.summary || item.content}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          item.type === "sportlink" ? "default" : "secondary"
                        }
                        className={cn(
                          item.type === "sportlink"
                            ? "bg-[#22c55e] text-white hover:bg-[#22c55e]/90"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        {item.type === "sportlink" ? "SportLink" : "Genel"}
                      </Badge>
                      <Badge
                        variant={
                          item.status === "published"
                            ? "outline"
                            : "destructive"
                        }
                        className={cn(
                          item.status === "published"
                            ? "border-[#22c55e] text-[#22c55e]"
                            : "bg-[#ef4444] text-white hover:bg-[#ef4444]/90"
                        )}
                      >
                        {item.status === "published" ? "Yayında" : "Taslak"}
                      </Badge>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {new Date(item.date).toLocaleDateString("tr-TR")}
                        </span>
                      </div>
                      {item.metadata.author && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span className="text-sm">
                            {item.metadata.author}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingNews(item);
                          setIsNewsModalOpen(true);
                        }}
                        className="hover:border-[#22c55e] hover:text-[#22c55e]"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDelete({ open: true, news: item });
                        }}
                        className="hover:border-[#ef4444] hover:text-[#ef4444]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "transition-colors",
                          item.status === "published"
                            ? "hover:border-[#ef4444] hover:text-[#ef4444]"
                            : "hover:border-[#22c55e] hover:text-[#22c55e]"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmStatus({
                            open: true,
                            news: item,
                            newStatus:
                              item.status === "published"
                                ? "draft"
                                : "published",
                          });
                        }}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground bg-black/5 dark:bg-white/5 p-3 rounded-lg">
                    <div>
                      <Smartphone className="h-4 w-4 inline-block mr-1.5" />
                      {item.metadata.viewCount || 0} görüntülenme
                    </div>
                    {item.metadata.lastModified && (
                      <div>
                        <Calendar className="h-4 w-4 inline-block mr-1.5" />
                        Son güncelleme:{" "}
                        {new Date(
                          item.metadata.lastModified
                        ).toLocaleDateString("tr-TR")}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <NewsModal
        open={isNewsModalOpen}
        onOpenChange={(open) => {
          setIsNewsModalOpen(open);
          if (!open) setEditingNews(null);
        }}
        news={editingNews}
        onSave={handleEditNews}
      />

      <Dialog open={isContentModalOpen} onOpenChange={setIsContentModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedNews?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedNews?.image && (
              <img
                src={selectedNews.image.url}
                alt={selectedNews.image.alt}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            <p className="whitespace-pre-wrap">{selectedNews?.content}</p>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={confirmDelete.open}
        onOpenChange={(open) =>
          setConfirmDelete({ open, news: open ? confirmDelete.news : null })
        }
        title="Haberi Sil"
        description={`"${confirmDelete.news?.title}" başlıklı haberi silmek istediğinizden emin misiniz?`}
        actionLabel="Sil"
        variant="destructive"
        onConfirm={() => {
          if (confirmDelete.news) {
            handleConfirmedDelete(confirmDelete.news.id);
          }
          setConfirmDelete({ open: false, news: null });
        }}
      />

      <ConfirmationDialog
        open={confirmStatus.open}
        onOpenChange={(open) =>
          setConfirmStatus({
            open,
            news: open ? confirmStatus.news : null,
            newStatus: null,
          })
        }
        title={
          confirmStatus.newStatus === "published"
            ? "Haberi Yayınla"
            : "Haberi Taslağa Al"
        }
        description={
          confirmStatus.newStatus === "published"
            ? `"${confirmStatus.news?.title}" başlıklı haberi yayınlamak istediğinizden emin misiniz?`
            : `"${confirmStatus.news?.title}" başlıklı haberi taslağa almak istediğinizden emin misiniz?`
        }
        actionLabel={
          confirmStatus.newStatus === "published" ? "Yayınla" : "Taslağa Al"
        }
        variant={
          confirmStatus.newStatus === "published" ? "default" : "destructive"
        }
        onConfirm={() => {
          if (confirmStatus.news && confirmStatus.newStatus) {
            handleConfirmedStatusChange(
              confirmStatus.news.id,
              confirmStatus.newStatus
            );
          }
          setConfirmStatus({ open: false, news: null, newStatus: null });
        }}
      />
    </div>
  );
}
