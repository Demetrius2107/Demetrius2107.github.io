+++
title = 'Stream流'
date = '2023-12-01T19:40:08+08:00'
draft = false
tags = ["java8新特性"]
categories = []
description = '''Before在单体项目和分布式数据库学习项目中曾使用过，但只是机械的照搬照抄，没有专门认真了解。 本次查阅相关材料后，通过一点简单的代码，对于流有了基本的认识。函数式编程用着确实很爽，之后计划再看一一遍SCIP。  Warn本篇文章仅是我初学Stream的认知复盘，没有完整成体系的知识讲解，且因为本人学识浅薄，可能会存在一定的疏漏，还望谅解。  Start1.define什么是Stream流Str'''
+++

<h2 id="Before"><a href="#Before" class="headerlink" title="Before"></a>Before</h2><p>在单体项目和分布式数据库学习项目中曾使用过，但只是机械的照搬照抄，没有专门认真了解。</p>
<p>本次查阅相关材料后，通过一点简单的代码，对于流有了基本的认识。函数式编程用着确实很爽，之后计划再看一一遍SCIP。</p>
<hr>
<h2 id="Warn"><a href="#Warn" class="headerlink" title="Warn"></a>Warn</h2><p>本篇文章仅是我初学Stream的认知复盘，没有完整成体系的知识讲解，且因为本人学识浅薄，可能会存在一定的疏漏，还望谅解。</p>
<hr>
<h2 id="Start"><a href="#Start" class="headerlink" title="Start"></a>Start</h2><h3 id="1-define"><a href="#1-define" class="headerlink" title="1.define"></a>1.define</h3><h4 id="什么是Stream流"><a href="#什么是Stream流" class="headerlink" title="什么是Stream流"></a>什么是Stream流</h4><p>Stream流是一个来自数据源（如集合、数组、IO通道）的元素序列，支持聚合操作，简化数据处理。高效且易于使用，善于处理大量数据。<strong>Stream流不是数据结构，是对数据的一种描述，不会存储数据，也不会修改数据源。</strong></p>
<p>Stream使用一种类似SQL语句从数据库查询数据的直观方式来提供对Java运算集合和表达的告诫抽象。</p>
<ul>
<li>数据源 流的来源。可以是集合，数组，I&#x2F;O channel,产生器 generator</li>
<li>聚合操作 类SQL。 filter，map,reduce,find,match,count,sorted,foreach</li>
<li>元素是特定类型的对象，并形成一个队列。 Java中的Stream并不会存储元素，<strong>按需计算</strong>。</li>
</ul>
<h4 id="Stream流和传统集合的区别"><a href="#Stream流和传统集合的区别" class="headerlink" title="Stream流和传统集合的区别"></a>Stream流和传统集合的区别</h4><ul>
<li>Stream流是一种数据流，不是数据结构，它不会存储数据。</li>
<li>Stream流操作是延迟执行的，只有当需要结果时才会执行。</li>
<li>Stream流可以进行并行处理，提高数据处理效率。</li>
<li>Stream流提供了丰富的<strong>函数式编程方法</strong>，使得代码更简洁、易读</li>
</ul>
<h3 id="2-Create"><a href="#2-Create" class="headerlink" title="2.Create"></a>2.Create</h3><h4 id="从集合创建Stream流"><a href="#从集合创建Stream流" class="headerlink" title="从集合创建Stream流"></a>从集合创建Stream流</h4><p>集合类（如List和Set）可以通过调用stream()方法创建一个Stream流。例如：</p>
<pre><code class="language-java">
List&lt;String&gt; list = Arrays.asList(&quot;apple&quot;, &quot;banana&quot;, &quot;orange&quot;);
Stream&lt;String&gt; stream = list.stream();
</code></pre>

<h4 id="从数组创建Stream流"><a href="#从数组创建Stream流" class="headerlink" title="从数组创建Stream流"></a>从数组创建Stream流</h4><p>可以使用Arrays.stream()方法从数组创建一个Stream流。例如：</p>
<pre><code class="language-java">
String[] array = &#123;&quot;apple&quot;, &quot;banana&quot;, &quot;orange&quot;&#125;;
Stream&lt;String&gt; stream = Arrays.stream(array);
</code></pre>

<h4 id="从I-O通道创建Stream流"><a href="#从I-O通道创建Stream流" class="headerlink" title="从I&#x2F;O通道创建Stream流"></a>从I&#x2F;O通道创建Stream流</h4><p>可以使用Files.lines()方法从文件中创建一个Stream流，每个元素代表文件中的一行。例如：</p>
<pre><code class="language-java">
Path path = Paths.get(&quot;file.txt&quot;);
try (Stream&lt;String&gt; stream = Files.lines(path)) &#123;
    stream.forEach(System.out::println);
&#125; catch (IOException e) &#123;
    e.printStackTrace();
&#125;
</code></pre>

<h4 id="其他Stream流创建方法"><a href="#其他Stream流创建方法" class="headerlink" title="其他Stream流创建方法"></a>其他Stream流创建方法</h4><ul>
<li>使用Stream.of()方法创建一个包含多个元素的Stream流：</li>
</ul>
<p>java Stream<String> stream &#x3D; Stream.of(“apple”, “banana”, “orange”);</p>
<ul>
<li>使用Stream.iterate()方法创建一个无限Stream流：</li>
</ul>
<p>java Stream<Integer> stream &#x3D; Stream.iterate(0, n -&gt; n + 2).limit(10);</p>
<ul>
<li>使用Stream.generate()方法创建一个无限Stream流：</li>
</ul>
<p>java Stream<Double> stream &#x3D; Stream.generate(Math::random).limit(5);</p>
<p>注意：在使用无限Stream流时，通常需要使用limit()方法限制元素数量，以避免无限循环</p>
<h3 id="3-Operation"><a href="#3-Operation" class="headerlink" title="3.Operation"></a>3.Operation</h3><p><img src="https://cdn.nlark.com/yuque/0/2023/png/28593325/1701429800116-5e199d64-e7f7-47be-b0bd-d0fb93c98202.png" alt="img"></p>
<h4 id="生成流"><a href="#生成流" class="headerlink" title="生成流"></a>生成流</h4><p>在 Java 8 中, 集合接口有两个方法来生成流：</p>
<ul>
<li><strong>stream()</strong> − 为集合创建串行流。</li>
<li><strong>parallelStream()</strong> − 为集合创建并行流。</li>
</ul>
<p>List<String> strings &#x3D; Arrays.asList(“abc”, “”, “bc”, “efg”, “abcd”,””, “jkl”); List<String> filtered &#x3D; strings.stream().filter(string -&gt; !string.isEmpty()).collect(Collectors.toList());</p>
<hr>
<h4 id="forEach-遍历"><a href="#forEach-遍历" class="headerlink" title="forEach 遍历"></a>forEach 遍历</h4><p>Stream 提供了新的方法 ‘forEach’ 来迭代流中的每个数据。以下代码片段使用 forEach 输出了10个随机数：</p>
<p>Randomrandom &#x3D; newRandom(); random.ints().limit(10).forEach(System.out::println);</p>
<hr>
<h4 id="map-映射"><a href="#map-映射" class="headerlink" title="map 映射"></a>map 映射</h4><p><strong>映射</strong>：可以将一个流的元素按照一定的映射规则映射到另一个流中<br><strong>map</strong>：接收一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新的元素。<br><strong>flatMap</strong>：接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流。</p>
<p>map 方法用于映射每个元素到对应的结果，以下代码片段使用 map 输出了元素对应的平方数：</p>
<p>List<Integer> numbers &#x3D; Arrays.asList(3, 2, 2, 3, 7, 3, 5); &#x2F;&#x2F; 获取对应的平方数List<Integer> squaresList &#x3D; numbers.stream().map(i -&gt; i*i).distinct().collect(Collectors.toList());</p>
<hr>
<h4 id="filter-过滤"><a href="#filter-过滤" class="headerlink" title="filter 过滤"></a>filter 过滤</h4><p>filter 方法用于通过设置的条件过滤出元素。以下代码片段使用 filter 方法过滤出空字符串：</p>
<p>List<String>strings &#x3D; Arrays.asList(“abc”, “”, “bc”, “efg”, “abcd”,””, “jkl”); &#x2F;&#x2F; 获取空字符串的数量longcount &#x3D; strings.stream().filter(string -&gt; string.isEmpty()).count();</p>
<hr>
<h4 id="limit-限制"><a href="#limit-限制" class="headerlink" title="limit 限制"></a>limit 限制</h4><ol>
<li>concat：合并留。</li>
<li>distinct：去重，去重的判断方法是对象自带equal。</li>
<li>limit：限制从流中获得前n个数据。</li>
<li>skip：跳过。</li>
</ol>
<p>limit 方法用于获取指定数量的流。 以下代码片段使用 limit 方法打印出 10 条数据：</p>
<p>Randomrandom &#x3D; newRandom(); random.ints().limit(10).forEach(System.out::println);</p>
<hr>
<h4 id="sorted-排序"><a href="#sorted-排序" class="headerlink" title="sorted 排序"></a>sorted 排序</h4><p>sorted，中间操作。有两种排序：</p>
<ol>
<li>sorted()：自然排序，流中元素需实现Comparable接口</li>
<li>sorted(Comparator com)：Comparator排序器自定义排序</li>
</ol>
<p>sorted 方法用于对流进行排序。以下代码片段使用 sorted 方法对输出的 10 个随机数进行排序：</p>
<p>Randomrandom &#x3D; newRandom(); random.ints().limit(10).sorted().forEach(System.out::println);</p>
<hr>
<h4 id="并行（parallel）程序"><a href="#并行（parallel）程序" class="headerlink" title="并行（parallel）程序"></a>并行（parallel）程序</h4><p>parallelStream 是流并行处理程序的代替方法。以下实例我们使用 parallelStream 来输出空字符串的数量：</p>
<p>List<String> strings &#x3D; Arrays.asList(“abc”, “”, “bc”, “efg”, “abcd”,””, “jkl”); &#x2F;&#x2F; 获取空字符串的数量longcount &#x3D; strings.parallelStream().filter(string -&gt; string.isEmpty()).count();</p>
<p>我们可以很容易的在顺序运行和并行之间切换。</p>
<hr>
<h4 id="Collectors-收集"><a href="#Collectors-收集" class="headerlink" title="Collectors 收集"></a>Collectors 收集</h4><p>Collectors 类实现了很多归约操作，例如将流转换成集合和聚合元素。Collectors 可用于返回列表或字符串：</p>
<p>收集（collect），可以说是内容最繁多、功能最丰富的部分、在开发过程中最常用的。从字面上去理解，就是把一个流收集起来，最终将流转换成新的集合List<?>、Map<?, ?>、Set&lt;?&gt;。</p>
<p>List<String>strings &#x3D; Arrays.asList(“abc”, “”, “bc”, “efg”, “abcd”,””, “jkl”); List<String> filtered &#x3D; strings.stream().filter(string -&gt; !string.isEmpty()).collect(Collectors.toList()); System.out.println(“筛选列表: “ + filtered); StringmergedString &#x3D; strings.stream().filter(string -&gt; !string.isEmpty()).collect(Collectors.joining(“, “)); System.out.println(“合并字符串: “ + mergedString);</p>
<hr>
<p>“以上只是列举了一些常见的操作，还有更多的细分操作没有列出，在以后的持续学习中会进一步了解”</p>
<h4 id="reduce-归约"><a href="#reduce-归约" class="headerlink" title="reduce 归约"></a>reduce 归约</h4><p>归约，也称缩减，顾名思义，是把一个流缩减成一个值，能实现对集合求和、求乘积和求最值操作。</p>
<h2 id="Improve"><a href="#Improve" class="headerlink" title="Improve"></a>Improve</h2><p>程序运行中，流Stream只能使用一次，使用后会默认关闭，不能重复使用；重复使用会报错，</p>
<p>在开发过程中，建议使用Stream.of(list)，解决list为null的问题；使用list.stream()之前需要判断list是否为null，避免报错<strong>空指针异常</strong>(java.lang.NullPointerException)。</p>
<p>更多使用中出现的问题我会进一步学习并进行理解，本篇仅为我个人对于Stream的初步认识。</p>
<h2 id="Reference"><a href="#Reference" class="headerlink" title="Reference"></a>Reference</h2><ol>
<li><a target="_blank" rel="noopener" href="https://www.runoob.com/java/java8-streams.html">https://www.runoob.com/java/java8-streams.html</a> 菜鸟教程</li>
<li><a target="_blank" rel="noopener" href="https://blog.csdn.net/m0_60489526/article/details/119984236">https://blog.csdn.net/m0_60489526/article/details/119984236</a> CSDN</li>
<li><a target="_blank" rel="noopener" href="https://zhuanlan.zhihu.com/p/439176814">https://zhuanlan.zhihu.com/p/439176814</a>   知乎</li>
<li><a target="_blank" rel="noopener" href="https://blog.csdn.net/qq_27242695/article/details/109668771">https://blog.csdn.net/qq_27242695/article/details/109668771</a> CSDN</li>
</ol>
