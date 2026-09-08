import React from 'react';
import { Locale } from '../types';
import signatureImg from '../assets/signature.png';

interface WelcomeAddressProps {
  locale: Locale;
}

export const WelcomeAddress: React.FC<WelcomeAddressProps> = ({ locale }) => {
  const isZh = locale === 'zh-Hans';

  return (
    <section 
      id="welcome-address"
      className="w-full py-12 sm:py-16 md:py-20 bg-[#f8fafc] border-b border-slate-200/80"
    >
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isZh ? '欢迎致辞' : 'Welcome Address'}
          </h2>
          <div className="w-16 h-1 bg-[#1B3A6B] mx-auto mt-3 rounded-full" />
        </div>

        {/* Letter Card Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-10 md:p-14 text-slate-800 leading-relaxed font-sans">
          
          {isZh ? (
            /* Chinese Welcome Address */
            <div className="space-y-5 text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] text-slate-700">
              <p className="font-bold text-lg sm:text-xl text-slate-900 mb-6">
                尊敬的各位同仁、各位来宾：
              </p>
              
              <p>
                当前，全球数字化、智能化浪潮加速演进，人工智能、大模型、数字孪生、物理AI等新兴技术与仿真科技深度融合，正在推动仿真技术从“规则驱动”向“AI自动生成”的范式跃迁。“万物皆可仿真”已逐步成为学界与产业界的重要共识，仿真技术在破解复杂系统难题、支撑科技创新、赋能产业升级和推动可持续发展中的作用愈发凸显。
              </p>
              
              <p>
                为深化全球仿真领域科技治理，促进仿真科技与产业交流合作，推动仿真技术创新发展与规模化应用，亚洲仿真联盟拟于2026年11月13日至16日在中国浙江省杭州市举办2026世界仿真大会。
              </p>
              
              <p>
                本届大会由亚洲仿真联盟主办，杭州市北京航空航天大学国际创新研究院、杭州云枢国创科技有限公司、中国工业合作协会仿真技术产业分会等承办，日本仿真学会、韩国仿真学会、新加坡仿真学会、马来西亚仿真学会、国际建模与仿真学会、欧洲仿真联盟等国际机构，以及中国仿真学会、中国工业合作协会、天目山实验室、虚拟现实技术与系统全国重点实验室等国内机构协办。大会以“AI驱动的全球仿真创新与协同治理”为主题，计划设置一个主论坛和十余个专业主题分论坛，内容涵盖物理AI与生成式仿真、智能仿真与数据治理、航空航天仿真技术、汽车与运载装备仿真、科学计算与仿真、智慧医疗与脑机接口、工业大模型与具身智能、先进EDA仿真、工业仿真软件研发与应用、低空交通与经济、世界模型与仿真技术、AI玩具和机器人、青年论坛等方向。
              </p>
              
              <p>
                大会还将设置高端对话、“出海”亚洲新机遇对接洽谈活动、新产品新技术发布会、仿真国际标准发布仪式、优秀国际仿真案例发布、合作签约仪式及第二届国际仿真科技展等丰富多样的交流活动，并计划发布《2026仿真科学与技术十大前沿问题进展》和《全球仿真领域年度创新成果TOP20》。同时，大会面向国内外科技工作者开展论文征集，优秀论文拟推荐至EI或SCI检索期刊，为全球仿真领域学术交流、成果展示与青年人才成长搭建高水平平台。
              </p>
              
              <p>
                亚洲仿真联盟以“开放、创新、协同、包容、共赢”为发展理念，致力于促进全球仿真技术进步与推广，推动仿真国际交流与合作，构建高质量国际交流平台。世界仿真大会作为亚洲仿真联盟主办的机制性、品牌性国际会议，将持续汇聚全球仿真及相关领域的权威专家、学者、企业领袖和技术精英，集中展示仿真科技最新前沿成果与应用案例，深入探讨仿真科技在前沿科学、智能制造、航空航天、新能源、公共治理等领域的创新实践和合作机遇。
              </p>
              
              <p className="font-medium text-slate-800">
                我谨代表大会组委会，热烈欢迎各位出席2026世界仿真大会。期待各位嘉宾和代表在本次大会中交流思想、分享成果、凝聚共识、深化合作，共同推动全球仿真科技创新发展。让我们相约杭州，携手开创AI驱动下全球仿真创新与协同治理的新未来！
              </p>

              {/* Sign-off */}
              <div className="pt-8 sm:pt-10 mt-6 border-t border-slate-100 flex flex-col items-end text-right">
                <div className="mb-2">
                  <img 
                    src={signatureImg} 
                    alt="张霖 签名" 
                    className="h-[70px] sm:h-20 w-auto object-contain"
                  />
                </div>
                <div className="font-bold text-base sm:text-lg text-slate-900">
                  张霖
                </div>
                <div className="text-sm font-medium text-slate-600 mt-0.5">
                  亚洲仿真联盟主席
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  2026世界仿真大会组委会
                </div>
              </div>
            </div>
          ) : (
            /* English Welcome Address */
            <div className="space-y-5 text-[15px] sm:text-[16px] md:text-[17px] leading-[1.8] text-slate-700">
              <p className="font-bold text-lg sm:text-xl text-slate-900 mb-6">
                Dear Colleagues and Distinguished Guests,
              </p>
              
              <p>
                The world is witnessing an accelerating wave of digitalization and intelligent transformation. Emerging technologies—including artificial intelligence, large models, digital twins, and Physical AI—are becoming deeply integrated with simulation science and technology, driving a paradigm shift from rule-driven simulation toward AI-generated simulation. The vision that “Simulation for Everything” is increasingly gaining recognition across both academia and industry. Simulation is playing an ever more important role in addressing complex-system challenges, advancing scientific and technological innovation, enabling industrial transformation, and supporting sustainable development.
              </p>
              
              <p>
                To strengthen global governance in simulation science and technology, promote international exchange and collaboration across academia and industry, and accelerate innovation and large-scale applications of simulation technologies, the Asia Simulation Federation (ASIASIM) will convene the 2026 Global Simulation Conference in Hangzhou, Zhejiang Province, China, from November 13 to 16, 2026.
              </p>
              
              <p>
                Organized by the ASIASIM and co-organized by the Hangzhou International Innovation Institute of Beihang University, the Simulation Technology Committee of China Industrial Cooperation Association (STC), and other institutions, the Congress is supported internationally by the Japan Society for Simulation Technology (JSST), The Korea Society for Simulation (KSS), Society of Simulation and Gaming of Singapore (SSAGSG), Malaysian Simulation Society (MSS), The Society for Modeling and Simulation International (SCS), EUROSIM – Federation of European Simulation Societies, and others. Supporting organizations in China include the China Simulation Federation (CSF), China Industrial Cooperation Association (CICA), Tianmushan Laboratory, State Key Laboratory of Virtual Reality Technology and Systems, and others.
              </p>
              
              <p>
                Under the theme “AI-Driven Global Simulation Innovation and Collaborative Governance,” the Congress will feature one plenary forum and more than ten specialized thematic forums. Key topics will include Physical AI, intelligent simulation and data governance; aerospace, automotive and transportation equipment simulation; embodied intelligence, robotics and AI toys; smart healthcare simulation and brain-computer interfaces; virtual experimental simulation and industry–education integration; industrial simulation software and industrial large models; advanced EDA and multiphysics simulation; low-altitude transportation technologies and reliability; social environments and the digital economy; and youth innovation and development.
              </p>
              
              <p>
                The Congress will also feature a diverse range of high-level activities, including high-level dialogues; business matchmaking sessions on new opportunities for global expansion into Asian markets; new product and technology launches; the release of international simulation standards; presentations of outstanding international simulation cases; cooperation agreement signing ceremonies; and the Second International Simulation Science and Technology Exhibition. The Congress also plans to release the “2026 Important Advances in the Top Ten Frontier Issues in Simulation Science and Technology.”
              </p>
              
              <p>
                In parallel, a global call for papers will invite submissions from researchers and professionals worldwide. Outstanding papers are expected to be recommended to EI- or SCI-indexed journals, providing a high-level platform for international academic exchange, presentation of research achievements, and the development of young talent in the global simulation community.
              </p>
              
              <p>
                Guided by the principles of Openness, Innovation, Collaboration, Inclusiveness, and Mutual Benefit, the Asia Simulation Federation (ASIASIM) is committed to advancing and promoting simulation technologies worldwide, strengthening international exchange and cooperation, and building high-quality platforms for global collaboration.
              </p>
              
              <p>
                As a flagship international conference initiated and organized by ASIASIM, the World Simulation Congress will continue to bring together leading experts, scholars, industry leaders, and technology professionals from simulation and related fields around the world. It will showcase cutting-edge advances and applications in simulation science and technology while facilitating in-depth discussions on innovative practices and opportunities for collaboration in areas including frontier science, intelligent manufacturing, aerospace, new energy, and public governance.
              </p>
              
              <p className="font-medium text-slate-800">
                On behalf of the Organizing Committee, I extend my warmest welcome to all of you to the 2026 World Simulation Congress. I look forward to seeing distinguished guests and delegates exchange ideas, share achievements, build consensus, and deepen collaboration throughout the Congress, contributing together to the continued advancement of simulation science and technology worldwide.
              </p>
              
              <p className="font-medium text-slate-800">
                We look forward to welcoming you to Hangzhou and working together to shape a new future for AI-driven global simulation innovation and collaborative governance.
              </p>

              {/* Sign-off */}
              <div className="pt-8 sm:pt-10 mt-6 border-t border-slate-100 flex flex-col items-end text-right">
                <div className="mb-2">
                  <img 
                    src={signatureImg} 
                    alt="Lin Zhang Signature" 
                    className="h-[70px] sm:h-20 w-auto object-contain"
                  />
                </div>
                <div className="font-bold text-base sm:text-lg text-slate-900">
                  Lin Zhang
                </div>
                <div className="text-sm font-medium text-slate-600 mt-0.5">
                  President, Asia Simulation Federation (ASIASIM)
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Organizing Committee of 2026 Global Simulation Conference
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
