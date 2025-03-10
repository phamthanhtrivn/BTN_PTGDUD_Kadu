
const Article = ({ article }) => {
      const formatTime = (time) => {
            return new Date(time).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
            });
      }
      return (
            <div style={{ backgroundColor: "#f3f3f3" }} className="p-4">
                  <h2 className="font-bold text-2xl">{article.title}</h2>
                  <span><i class="fa-solid fa-calendar-days my-4"></i> {formatTime(article.timeRelease)}</span>
                  <div className="body">
                        {article.content?.map((content, index) => {
                              if (content.subTitle) {
                                    return (
                                          <div key={index}>
                                                <h6 className="font-bold my-2" >{content.subTitle}</h6>
                                                <p className="text-sm" style={{ whiteSpace: "pre-line" }}>{content.text}</p>
                                          </div>
                                    );
                              }
                              if (content.text) {
                                    return (
                                          <p className="text-sm" key={index} style={{ whiteSpace: "pre-line" }}>
                                                {content.text}
                                          </p>
                                    );
                              }
                              if (content.image) {
                                    return (
                                          <div className="my-3" key={index}>
                                                <img src={content.image} alt={`Content Image ${index}`} style={{ maxWidth: "100%" }} />
                                          </div>
                                    );
                              }
                              return null;
                        })}
                  </div>
            </div>
      );
}
export default Article;