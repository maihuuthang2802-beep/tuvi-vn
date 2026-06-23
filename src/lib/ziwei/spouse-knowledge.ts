/**
 * Kho luận giải 14 chính tinh tại cung Phu Thê.
 * Dịch & biên tập từ cổ pháp Tử Vi Đẩu Số + hệ thống luận đoán hôn nhân của Nê Hải Hạ.
 * Dùng cho phần "Phu Thê luận giải" trong Hợp Mệnh và bồi cảnh cho AI.
 */

export interface SpouseStarProfile {
  summary: string;
  good: string;
  bad: string;
  spouseTraits: string;
  timing: string;
  quote?: string;
}

export const STAR_IN_PHU_THE: Record<string, SpouseStarProfile> = {
  '紫微': {
    summary: 'Người bạn đời kiêu hãnh, có năng lực; nên kết hôn muộn, tình cảm dựa trên sự tôn trọng.',
    good: 'Tam phương có Tả Phụ Hữu Bật giáp: người bạn đời hiền tài, sau cưới được trợ giúp; tam hợp gặp Lộc: tài lộc song toàn.',
    bad: 'Cô quân vô phụ: người bạn đời mạnh mẽ, khó nói chuyện; cung Thìn Tuất tình duyên nhạt; gặp Phá Quân: trước hôn nhân nhiều trở ngại.',
    spouseTraits: 'Người bạn đời khí chất kiêu hãnh, có chính kiến, tự trọng cao, năng lực mạnh nhưng không dễ bộc lộ cảm xúc.',
    timing: 'Nên kết hôn muộn (nam trên 30, nữ trên 27), cưới sớm dễ trắc trở.',
    quote: 'Tử Vi tại Phu Thê, cô khắc, nên muộn hôn, tình cảm tốt nhưng chi phí giao tiếp cao.',
  },
  '天机': {
    summary: 'Hôn nhân nhiều biến động, nên chọn người bạn đời cách tuổi lớn.',
    good: 'Gặp Lộc Tồn hoặc Hóa Lộc: tình cảm giữ được; gặp Thái Âm: thêm phần tinh tế dịu dàng.',
    bad: 'Hóa Kỵ hoặc gặp sát tinh: tình cảm biến động lớn, dễ chia xa; Thiên Cơ hay đổi, người bạn đời dễ phân vân về tình cảm.',
    spouseTraits: 'Người bạn đời thông minh, đa biến, tâm tư tinh tế, duyên với tôn giáo triết học, có chút thần kinh nhạy cảm.',
    timing: 'Nên chọn người cách tuổi lớn (cách 6 tuổi trở lên) để giảm xung đột do hay đổi.',
    quote: 'Thiên Cơ hay đổi, không hợp đứng một mình, hôn nhân đầy biến động.',
  },
  '太阳': {
    summary: 'Nam mệnh trợ vợ, nữ mệnh vượng chồng; lạc hãm hóa Kỵ thì lại chủ khắc.',
    good: 'Miếu vượng (Mão đến Thân): người bạn đời có năng lực, nam mệnh có vợ hiền trợ giúp; nữ mệnh lấy chồng vượng, hôn nhân tốt đẹp.',
    bad: 'Lạc hãm (Dậu đến Dần): nam mệnh vợ yếu, nữ mệnh lấy chồng kém; hóa Kỵ: nữ mệnh "trên không thấy cha, dưới không thấy con, giữa không thấy chồng" — mười năm đó chồng có biến cố lớn.',
    spouseTraits: 'Người bạn đời cởi mở, rộng lượng, có ý thức hình ảnh trước công chúng, hào sảng nhưng đôi khi quá mạnh mẽ.',
    timing: 'Tình cảm thường nồng lúc đầu nhạt về sau, nên giữ khoảng cách hợp lý để duy trì sự mới mẻ.',
    quote: 'Thái Dương hóa Kỵ, trên không thấy cha, dưới không thấy con, giữa không thấy chồng — mười năm đó chồng tất có tai họa lớn.',
  },
  '武曲': {
    summary: 'Sao quả tú, hôn nhân chủ khắc, nên kết hôn muộn.',
    good: 'Hóa Lộc: người bạn đời có năng lực tài chính, nhưng nam mệnh lại ngại vợ quá năng; gặp Lộc Tồn giáp trợ: hôn nhân ổn định có tài.',
    bad: 'Hóa Kỵ: cô quả, khó cưới, hoặc người bạn đời có khiếm khuyết; Vũ Khúc Thất Sát (Mão Dậu): điềm xấu cho hôn nhân; gặp một trong tứ sát: chủ ly hôn.',
    spouseTraits: 'Người bạn đời cương cường độc lập, nói thẳng, không khéo bộc lộ tình cảm, năng lực kinh tế mạnh nhưng tính cô khắc.',
    timing: 'Hệ Vũ Khúc nên kết hôn sau 30 tuổi, cưới sớm dễ tan sớm.',
    quote: 'Vũ Khúc hóa Kỵ là sao hình ngục, hệ Vũ Khúc nên hôn nhân muộn.',
  },
  '天同': {
    summary: 'Người bạn đời ôn hòa hưởng lạc, nên chọn người cách tuổi lớn, kết hôn muộn là tốt.',
    good: 'Gặp Lộc Tồn hoặc Hóa Lộc: người bạn đời ôn hòa có tài, gia đạo yên ổn; cùng Thái Âm: tình cảm dịu dàng ngọt ngào.',
    bad: 'Hóa Kỵ: tình cảm lúc đầu còn ổn, dần nhạt vì thiếu ăn ý sinh oán trách; gặp nhiều sát: lười biếng trở thành gánh nặng.',
    spouseTraits: 'Người bạn đời ôn hòa hiền lành, lạc quan dễ chịu, nhưng có thể lười biếng, thiên hướng hưởng lạc khá rõ.',
    timing: 'Nam lấy vợ nhỏ tuổi hơn, nữ lấy chồng lớn tuổi hơn; cách tuổi 8 năm trở lên là kết duyên tốt nhất.',
  },
  '廉贞': {
    summary: 'Chính tinh bất ổn nhất tại Phu Thê, rủi ro sinh ly tử biệt cao.',
    good: 'Liêm Trinh Thiên Phủ (Tử Ngọ): người bạn đời ôn hòa thanh tú, tình cảm tạm ổn, thường làm công ăn lương.',
    bad: 'Liêm Trinh Tham Lang: không sinh ly thì tử biệt; Liêm Trinh Phá Quân: làm mộ dưới nước; Liêm Trinh Thất Sát: chôn xác giữa đường; hóa Kỵ: tình cảm quấy nhiễu không ngừng, vòng lặp hòa rồi tan; cùng Hỏa Tinh: dù có sao tốt vẫn ly thân.',
    spouseTraits: 'Người bạn đời ngoại hình nổi bật, giỏi giao tiếp, giàu giá trị cảm xúc nhưng bất ổn; có thể ly nhiều hơn hợp.',
    timing: 'Nam mệnh nên cưới vợ nhỏ tuổi (kém 6-12 tuổi), nữ mệnh nên lấy chồng lớn tuổi hơn.',
    quote: 'Liêm Trinh Tham Lang/Liêm Trinh Phá Quân tại Phu Thê, bất kể nam nữ, không sinh ly thì tử biệt; Liêm Trinh Thất Sát — chôn xác giữa đường; Liêm Trinh Phá Quân — làm mộ dưới nước; Liêm Trinh Tham Lang — chết yểu ngang.',
  },
  '天府': {
    summary: 'Sao lành, chủ sinh ly không tử biệt, tình cảm ổn nhưng có phần nhạt.',
    good: 'Gặp Lộc Tồn hoặc Hóa Lộc: tài lộc song toàn, tình cảm ổn định; tam phương không sát: vợ chồng yên ổn hài hòa.',
    bad: 'Tả Hữu đơn sao: dễ có hôn nhân lần hai; gặp tứ sát: tình cảm thờ ơ, khả năng sinh ly tăng.',
    spouseTraits: 'Người bạn đời văn nhã, sở thích rộng, giữ tiền có nguyên tắc, năng lực làm việc tốt nhưng khá bảo thủ.',
    timing: 'Nam mệnh người bạn đời lớn tuổi, nữ mệnh người bạn đời nhỏ tuổi; tình cảm ổn định nhưng cần chủ động vun đắp.',
  },
  '太阴': {
    summary: 'Ưa người bạn đời thanh tú dịu dàng; lạc hãm thêm sát thì tình cảm hay đổi.',
    good: 'Miếu vượng (Tý đến Ngọ) gặp cát: người bạn đời thanh tú có thành tựu; nam mệnh vợ đẹp; nữ mệnh tự thân thanh tú có khí chất.',
    bad: 'Lạc hãm (Mùi đến Hợi): tình cảm dễ đổi, người bạn đời sức khỏe kém; hóa Kỵ (nam mệnh đặc biệt kỵ): mẹ chồng và vợ chắc chắn bất hòa; gặp Hỏa Linh: tình cảm biến cố lớn.',
    spouseTraits: 'Người bạn đời dịu dàng thanh tú, tinh tế nhạy cảm, nặng tình cảm nhưng đôi lúc dễ xúc động.',
    timing: 'Không ràng buộc đặc biệt, nhưng lạc hãm nên kết hôn muộn.',
    quote: 'Số của người nam, sợ nhất Thái Âm hóa Kỵ, mẹ chồng và vợ chắc chắn không hòa thuận.',
  },
  '贪狼': {
    summary: 'Đào hoa mạnh nhất, hôn nhân không ổn định, rủi ro ngoại tình cao.',
    good: 'Hóa Lộc: người bạn đời tài năng, duyên dáng, tình cảm ngọt ngào (nhưng rủi ro ngoại tình không giảm); gặp Hóa Khoa: giảm ngoại tình.',
    bad: 'Hóa Kỵ: nhiều khả năng tái hôn; Tử Vi Tham Lang (Mão Dậu): người bạn đời hay đi xa, có dấu hiệu ngoại tình; gặp tứ sát: chắc chắn sinh ly; Tham Lang tại Ngọ (sao võ quan) lại chủ người bạn đời nghề võ, tương đối ổn định.',
    spouseTraits: 'Người bạn đời tài năng vượt trội, giao tiếp tốt, duyên khác giới rất mạnh, nhưng dục vọng lớn khó ràng buộc.',
    timing: 'Cưới sớm tình cảm dễ biến, nên muộn hôn; trước cưới cần hiểu rõ quan hệ khác giới của đối phương.',
    quote: 'Tham Lang ngoài chỉ đào hoa, còn chỉ rượu sắc tài khí cờ bạc, tất cả đều nằm trong Tham Lang; Tham Lang tại Ngọ là sao võ quan, không nên tùy tiện luận đào hoa.',
  },
  '巨门': {
    summary: 'Nhiều thị phi miệng lưỡi, vợ chồng dễ cãi vã, cần Thái Dương hóa giải.',
    good: 'Thái Dương miếu vượng hội chiếu: lại chủ hôn nhân hòa thuận, tài ăn nói hóa thành lợi thế giao tiếp; hóa Lộc: người bạn đời tài năng, tài lộc nhờ vợ/chồng mà mở ra.',
    bad: 'Hóa Kỵ: người bạn đời hay cằn nhằn, thị phi không ngớt; cùng Đà La: vợ chồng tự tìm phiền não; đứng một mình không gặp sao tốt: tình cảm bị dồn nén, mâu thuẫn sâu.',
    spouseTraits: 'Người bạn đời tài ăn nói, hay ganh tỵ, để ý thể diện, đôi lúc khắt khe nhưng nội tâm sâu sắc.',
    timing: 'Không ràng buộc đặc biệt, nhưng cần chuẩn bị tâm lý giao tiếp và mài giũa lâu dài.',
  },
  '天相': {
    summary: 'Duyên lành kiểu "thân càng thêm thân", vợ chồng đồng hành, hôn nhân hợp tác.',
    good: 'Đủ cả Tả Hữu: tình cảm chung thủy, hôn nhân vững; người bạn đời chính trực thật thà; tam hợp gặp Lộc: tài lộc khả kỳ.',
    bad: 'Tả Hữu đơn sao: có thể là dấu hiệu tái hôn; gặp nhiều sát: tình cảm dồn nén ấm ức, không khéo bộc lộ.',
    spouseTraits: 'Người bạn đời chính trực thật thà, giữ chữ tín, không thích xung đột, khéo điều hòa, là người bạn đồng hành tuyệt vời.',
    timing: 'Thường phát triển từ quan hệ quen biết như bạn học, đồng nghiệp, hàng xóm; hợp vợ chồng cùng hợp tác làm việc.',
  },
  '天梁': {
    summary: 'Ưa người bạn đời có trách nhiệm hoặc tuổi lớn hơn, trước hôn nhân nhiều trắc trở.',
    good: 'Gặp Lộc: người bạn đời có phước, tình cảm chắc chắn; tam hợp có sao tốt: tình cảm vun đắp ổn định lý trí.',
    bad: 'Hóa Kỵ hoặc gặp sát: hay cằn nhằn, áp đặt, tình cảm xa cách; Thiên Lương cùng Thiên Mã: vợ chồng vì hoàn cảnh mà xa nhau; trước hôn nhân dễ thất bại tình đầu.',
    spouseTraits: 'Người bạn đời trách nhiệm cao, chín chắn từng trải, hay nói lý lẽ, nhưng đôi khi có xu hướng giáo huấn.',
    timing: 'Trước hôn nhân nhiều trắc trở là thường tình, một khi cưới lại càng vững; không gặp sát thì duyên sau cưới càng sâu.',
  },
  '七杀': {
    summary: '"Chăn gối nửa lạnh" — ít gần nhiều xa, nên kết hôn muộn sau 30.',
    good: 'Miếu vượng (Dần Thân): người bạn đời cứng cỏi nhưng chung thủy, một khi đã đầu tư thì dồn hết tâm lực; gặp Hóa Lộc trợ giúp: giảm bớt cô khắc.',
    bad: 'Gặp sát: tình cảm bề ngoài hòa thuận nhưng trong lòng bất mãn, nam mệnh chủ tái hôn; nữ mệnh nên làm vợ thứ; cung Mão Dậu (Vũ Khúc Thất Sát): vận hôn nhân kém nhất.',
    spouseTraits: 'Người bạn đời cứng cỏi cô độc, yêu nhanh mà rời cũng nhanh, nóng lạnh đều chóng vánh.',
    timing: 'Nên kết hôn muộn, sau 30 tuổi hôn nhân mới vững; cưới sớm dễ trắc trở.',
    quote: 'Thất Sát ở cung Phu Thê khiến chăn gối nửa lạnh (cổ phú); nếu lấy vợ mà Thất Sát nhập Mệnh thì coi như hỏng mất một nửa, mệt lắm, lúc nào cũng như cỏ cây cũng thành quân địch.',
  },
  '破军': {
    summary: 'Sao phá hao hôn nhân, không sao nào sánh được, theo đuổi tình cảm không ràng buộc.',
    good: 'Hóa Lộc: phá rồi mới lập, tình cảm trải qua trắc trở lại đi được đến cùng; sao Anh tinh nhập miếu: người bạn đời tuấn tú có cá tính.',
    bad: 'Hóa Kỵ: phá hủy gần hết, dễ tái hôn hoặc không cưới; Tử Vi Phá Quân (Sửu Mùi): không gặp sát vẫn khắc, gặp sát chắc chắn ly; cùng Liêm Trinh: làm mộ dưới nước; trung niên về sau có dấu hiệu ngủ riêng phòng.',
    spouseTraits: 'Người bạn đời theo đuổi tự do, không thích ràng buộc, dũng cảm phá cách, nhưng quan niệm hôn nhân mỏng, một đời nhiều biến động.',
    timing: 'Trước hôn nhân dễ yêu từ ánh nhìn đầu hoặc cưới vội, nên kéo dài thời gian tìm hiểu trước khi quyết định.',
    quote: 'Liêm Trinh Phá Quân tại Phu Thê, làm mộ dưới nước; Phá Quân là sao có sức phá hoại hôn nhân mạnh nhất.',
  },
};

export const SIHUA_IN_PHU_THE: Record<string, string> = {
  '禄': 'Có duyên tiền định với người bạn đời, tính cách lạc quan, sau cưới tình cảm càng tốt, người bạn đời càng giỏi kiếm tiền, duyên phận sâu đậm; tự hóa Lộc thì tiền vào rồi ra, có tình nhưng khó giữ.',
  '权': 'Hôn nhân phần nhiều do chủ động giành lấy, người bạn đời nắm quyền quyết định, đa số việc do người bạn đời tự định, cần học cách buông; hôn nhân kiểu giành giật, càng cố ép càng khó được.',
  '科': 'Coi như Lộc nhỏ, có thể hòa hợp với người bạn đời, có duyên quý nhân, lợi cho yêu và cưới; Khoa tại Phu Thê chủ người bạn đời có danh tiếng hoặc kỹ năng chuyên môn.',
  '忌': 'Mang nợ duyên hôn nhân, cưới sớm tan sớm, nên kết hôn muộn hoặc không cưới; người bạn đời có lời oán trách với mình; Hóa Kỵ xung Phu Thê đặc biệt hung — điềm sinh ly tử biệt.',
};

export function getSpouseProfile(starName: string): SpouseStarProfile | null {
  return STAR_IN_PHU_THE[starName] || null;
}

export function getSihuaInPhuThe(siHua: string): string | null {
  return SIHUA_IN_PHU_THE[siHua] || null;
}
