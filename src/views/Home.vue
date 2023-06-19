<script setup>
import Footer from "@/components/Footer.vue";
</script>
<template>
  <header class="bg-white py-6">
    <div class="container flex mx-auto px-20 justify-between items-center">
      <ul class="flex space-x-7">
        <li>
          <RouterLink to="/">
            <img src="@/assets/Logo.svg" alt="logo" class="w-20 inline-flex" />
          </RouterLink>
        </li>
        <li><a href="#" class="text-black hover:text-gray-300">功能</a></li>
        <li><a href="#" class="text-black hover:text-gray-300">方案</a></li>
        <li><a href="#" class="text-black hover:text-gray-300">適用情境</a></li>
      </ul>
      <ul class="flex space-x-2">
        <li>
          <RouterLink class="btn btn-outline-secondary" to="/sign-in"
            >登入</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/sign-up" class="btn btn-primary"
            >免費試用</RouterLink
          >
        </li>
      </ul>
    </div>
  </header>
  <section>
    <div class="container flex mx-auto">
      <div class="flex w-full justify-center items-center md-w-1/2">
        <div class="space-y-5">
          <h1 class="font-bold text-3xl">使用催落，<br />讓你事半功倍</h1>
          <button class="btn-linear">立即試用 →</button>
        </div>
      </div>
      <div class="w-full md-w-1/2">
        <img src="@/assets/banner.jpg" alt="" class="w-full" />
      </div>
    </div>
  </section>
  <section class="bg-neutral-5 mt-5 py-5">
    <div class="container mx-auto">
      <h2 class="font-bold text-black text-center pb-6 text-2xl">催落特色</h2>
      <div class="flex justify-between">
        <div class="w-full px-6 md:w-1/2">
          <img src="@/assets/features.png" alt="" />
        </div>
        <div class="mt-11 w-full px-6 md:w-1/2">
          <h2 class="font-bold mb-6 text-primary-1 text-2xl">時程設定與提醒</h2>
          <p class="leading-relaxed mb-6 text-gray-700">
            讓您能夠輕鬆地設定和追蹤專案的時程，同時提供即時提醒功能，確保您不會錯過任何重要的期限或里程碑。<br />
            這將使您更有效率地管理時間，達成預期目標。
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="bg-neutral-5 py-5">
    <div class="container mx-auto">
      <div class="flex justify-between">
        <div class="mt-11 w-full px-6 md:w-1/2">
          <h2 class="font-bold text-xl mb-6 text-secondary-1">
            輕鬆加相關人員進專案
          </h2>
          <p class="text-l leading-relaxed mb-6 text-gray-700">
            鬆地邀請和管理專案相關的人員，包括團隊成員、客戶、合作夥伴等等。<br />這樣，您可以更加方便地協調合作，提高團隊協作的效率和效能。
          </p>
        </div>
        <div class="w-full px-6 md:w-1/2">
          <img src="@/assets/teams.png" alt="" />
        </div>
      </div>
    </div>
  </section>
  <section class="bg-neutral-5 py-5">
    <div class="container mx-auto">
      <div class="flex justify-between">
        <div class="w-full px-6 md:w-1/2">
          <img src="@/assets/diagram.png" alt="" />
        </div>
        <div class="mt-11 w-full px-6 md:w-1/2">
          <h2 class="font-bold mb-6 text-primary-1 text-2xl">
            卡片輕鬆拖曳移動
          </h2>
          <p class="leading-relaxed mb-6 text-gray-700">
            催落提供了方便的卡片拖曳移動功能，使您可以輕鬆地重新排列和重新分配工作。<br />這讓您可以更快速地適應變化，更靈活地管理和分配任務，從而提高整體專案的效率。
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="bg-neutral-5 py-5">
    <div class="container mx-auto">
      <div class="flex justify-between">
        <div class="mt-11 w-full px-6 md:w-1/2">
          <h2 class="font-bold text-xl mb-6 text-secondary-1">
            自由分享給他人
          </h2>
          <p class="leading-relaxed mb-6 text-gray-700">
            催落允許您輕鬆地分享您的專案給他人，包括您的客戶、合作夥伴或任何其他人。<br />
            這樣，您可以更容易地協調合作、分享進度和成果，提高合作夥伴的參與度和整體項目的可見性。
          </p>
        </div>
        <div class="w-full px-6 md:w-1/2">
          <img src="@/assets/teams.png" alt="" />
        </div>
      </div>
    </div>
  </section>
  <section class="bg-neutral-5 py-5">
    <div class="container mx-auto">
      <div class="flex justify-between">
        <div class="w-full px-6 md:w-1/2">
          <img src="@/assets/add_list.png" alt="" />
        </div>
        <div class="mt-11 w-full px-6 md:w-1/2">
          <h2 class="font-bold mb-6 text-primary-1 text-2xl">
            快速增加卡片與列表
          </h2>
          <p class="leading-relaxed mb-6 text-gray-700">
            催落提供了自由增加卡片和列表的功能，使您可以更靈活地管理和分配工作。<br />
            這樣，您可以根據您的實際需要隨時調整和優化專案，從而更好地達成預期目標。
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="bg-neutral-5 py-5">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <div class="mt-11 w-full px-6 md:w-1/2">
          <h2 class="font-bold text-xl mb-6 text-secondary-1">
            卡片內容自由定義
          </h2>
          <p class="text-l leading-relaxed mb-6 text-gray-700">
            催落允許您自由定義卡片的內容，包括列表、勾選、圖片、回覆等功能，以滿足不同類型的工作需要。<br />這樣，您可以更好地組織和管理工作，提高整體項目的效率和效益。
          </p>
        </div>
        <div class="w-full px-6 md:w-1/2">
          <img src="@/assets/card.png" alt="" class="mx-auto" />
        </div>
      </div>
    </div>
  </section>
  <section class="bg-gradient-to-b from-secondary-3 to-primary-3 py-20">
    <div class="container mx-auto">
      <h2 class="font-bold py-3 text-2xl">三大生產力項目</h2>
      <div class="flex space-x-5 mt-5">
        <div class="w-4/12">
          <div class="flex p-5">
            <div>
              <span class="font-semibold text-xl py-2">工作區</span>
              <p>催落讓使用者輕鬆能建立工作區，區別各個工作環境的專案</p>
            </div>
          </div>
          <div class="flex p-5">
            <div>
              <span class="font-semibold text-xl py-2">專案看板</span>
              <p>
                催落的每個專案都是一個獨立看板，可依據不同專案建立多個看板，邀請不同人員加入各自看板
              </p>
            </div>
          </div>
          <div class="bg-white rounded-xl flex p-5">
            <div class="">
              <span class="font-semibold text-xl py-2">項目卡片</span>
              <p>
                將專案拆分為小項目後，可以建立項目小卡，並在裡面寫該項目的待辦事項
              </p>
            </div>
          </div>
        </div>
        <div class="w-8/12">
          <img src="@/assets/card_detail.png" alt="" class="mx-auto" />
        </div>
      </div>
    </div>
  </section>
  <section class="bg-neutral-5 py-5">
    <div class="container mx-auto text-center">
      <h2 class="font-bold py-3 text-2xl">數據圖表儀表板</h2>
      <p class="text-l text-black mb-10">
        催落提供了一個強大的儀表板分析功能<br />讓您輕鬆地掌握專案的實時進度和績效優化專案管理策略
      </p>
      <img src="@/assets/dashboard.png" alt="" class="mx-auto" />
    </div>
  </section>
  <section class="bg-neutral-5 py-5">
    <div class="container mx-auto text-center">
      <h2 class="font-bold text-xl py-3">使用者心得</h2>
      <img src="@/assets/recommend.png" alt="" class="mx-auto" />
    </div>
  </section>
  <section class="bg-neutral-5 py-5">
    <div class="container mx-auto text-center">
      <h2 class="font-bold text-xl py-3">查看方案</h2>
      <p class="text-l text-black mb-10">
        迫不及待想使用催落了吧！<br />看看有哪些方案，快來加入我們！
      </p>
      <img src="@/assets/price.png" alt="" class="mx-auto" />
    </div>
  </section>
  <Footer class="bg-neutral-5" />
</template>
